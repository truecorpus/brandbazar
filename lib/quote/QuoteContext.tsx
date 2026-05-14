'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { QuoteFormData, initialQuoteData } from './types';
import { getProductById } from './data';
import { gtagEvent, EVENT_QUOTE_SUBMIT } from '@/lib/analytics';

const STORAGE_KEY = 'brandbazar-quote-draft';

interface QuoteContextType {
  formData: QuoteFormData;
  submitted: boolean;
  quoteId: string | null;
  isSubmitting: boolean;
  submitError: string | null;
  addProduct: (productId: string, quantity?: number) => void;
  removeProduct: (productId: string) => void;
  updateProductDetails: (productId: string, details: Partial<{ quantity: number }>) => void;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  submitQuote: () => Promise<void>;
  resetQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<QuoteFormData>(initialQuoteData);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const draft = parsed.formData || parsed;
        // Default to step 0 equivalent if no products selected
        setFormData((prev) => ({ ...prev, ...draft }));
      }
    } catch (e) {
      console.error('Failed to hydrate quote from localStorage', e);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData }));
    } catch (e) {
      console.error('Failed to persist quote to localStorage', e);
    }
  }, [formData, hydrated]);

  const addProduct = useCallback((productId: string, quantity?: number) => {
    setFormData((prev) => {
      if (prev.products.some((p) => p.productId === productId)) return prev;
      const product = getProductById(productId);
      return {
        ...prev,
        products: [
          ...prev.products,
          { productId, quantity: quantity ?? product?.defaultQty ?? 100 },
        ],
      };
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.productId !== productId),
    }));
  }, []);

  const updateProductDetails = useCallback(
    (productId: string, details: Partial<{ quantity: number }>) => {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.productId === productId ? { ...p, ...details } : p
        ),
      }));
    },
    []
  );

  const updateFormData = useCallback((data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const submitQuote = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit quote');
      }
      setSubmitted(true);
      setQuoteId(json.quoteId);
      gtagEvent(EVENT_QUOTE_SUBMIT, {
        quote_id: json.quoteId,
        product_count: formData.products.length,
      });
      // Clear draft on success
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear quote draft from localStorage', e);
      }
    } catch (e: any) {
      setSubmitError(e.message || 'Something went wrong');
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetQuote = useCallback(() => {
    setFormData(initialQuoteData);
    setSubmitted(false);
    setQuoteId(null);
    setSubmitError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear quote draft from localStorage', e);
    }
  }, []);

  return (
    <QuoteContext.Provider
      value={{
        formData,
        submitted,
        quoteId,
        isSubmitting,
        submitError,
        addProduct,
        removeProduct,
        updateProductDetails,
        updateFormData,
        submitQuote,
        resetQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within a QuoteProvider');
  return ctx;
}
