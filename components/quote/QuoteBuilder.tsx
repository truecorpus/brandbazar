'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useQuote } from '@/lib/quote/QuoteContext';
import { quoteProducts } from '@/lib/quote/data';
import { QuoteStepIndicator } from './QuoteStepIndicator';
import { QuoteStepProduct } from './QuoteStepProduct';
import { QuoteStepDetails } from './QuoteStepDetails';
import { QuoteStepUpload } from './QuoteStepUpload';
import { QuoteStepTimeline } from './QuoteStepTimeline';
import { QuoteStepReview } from './QuoteStepReview';
import { QuoteSuccess } from './QuoteSuccess';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

const TOTAL_STEPS = 5;

const SLUG_TO_QUOTE_ID: Record<string, string> = {
  'custom-mugs': 'custom-mugs',
  'branded-bottles': 'branded-bottles',
  'premium-notebooks': 'notebooks',
  'custom-packaging': 'packaging',
  'corporate-gifts': 'corporate-gifts',
  'employee-kits': 'employee-kits',
};

export function QuoteBuilder() {
  const { formData, submitted, submitQuote, updateFormData, isSubmitting, submitError, addProduct } = useQuote();
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (!productSlug) return;
    const productId = SLUG_TO_QUOTE_ID[productSlug];
    if (!productId) return;
    const exists = formData.products.some((p) => p.productId === productId);
    if (!exists) {
      addProduct(productId);
    }
  }, [searchParams, addProduct, formData.products]);

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    await submitQuote();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return <QuoteSuccess />;
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.products.length > 0;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return (
          formData.timeline !== '' &&
          formData.budget !== '' &&
          formData.name !== '' &&
          formData.email !== ''
        );
      case 4:
        return (
          formData.products.length > 0 &&
          formData.name !== '' &&
          formData.email !== ''
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <QuoteStepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

      <div className="container-brand py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <QuoteStepProduct key="step0" data={formData} onUpdate={updateFormData} />
          )}
          {step === 1 && (
            <QuoteStepDetails key="step1" data={formData} onUpdate={updateFormData} />
          )}
          {step === 2 && (
            <QuoteStepUpload key="step2" data={formData} onUpdate={updateFormData} />
          )}
          {step === 3 && (
            <QuoteStepTimeline key="step3" data={formData} onUpdate={updateFormData} />
          )}
          {step === 4 && (
            <QuoteStepReview
              key="step4"
              data={formData}
              onUpdate={updateFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </AnimatePresence>

        {/* Error banner */}
        {submitError && (
          <div className="max-w-[800px] mx-auto mt-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{submitError}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="max-w-[800px] mx-auto mt-12 lg:mt-16 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px]
                ${
                  step === 0
                    ? 'text-charcoal/20 cursor-not-allowed'
                    : 'text-charcoal/60 hover:text-rich hover:bg-ivory-100'
                }
              `}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed()}
              className={`
                inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all min-h-[44px]
                ${
                  canProceed()
                    ? 'bg-rich text-white hover:bg-rich/90 shadow-soft'
                    : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                }
              `}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
