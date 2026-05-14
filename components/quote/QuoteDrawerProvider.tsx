'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface QuoteDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const QuoteDrawerContext = createContext<QuoteDrawerContextType | undefined>(undefined);

export function QuoteDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <QuoteDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </QuoteDrawerContext.Provider>
  );
}

export function useQuoteDrawer() {
  const ctx = useContext(QuoteDrawerContext);
  if (!ctx) throw new Error('useQuoteDrawer must be used within a QuoteDrawerProvider');
  return ctx;
}
