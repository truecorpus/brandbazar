'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easing, duration } from '@/lib/animations';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/config';
import { useQuote } from '@/lib/quote/QuoteContext';
import { useQuoteDrawer } from '@/components/quote/QuoteDrawerProvider';
import { gtagEvent, EVENT_WHATSAPP_CLICK, EVENT_CTA_CLICK } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

/* ─── FLOATING CTA BUTTON ─── */

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openDrawer } = useQuoteDrawer();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5"
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.3, ease: easing.smooth }}
        >
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gtagEvent(EVENT_WHATSAPP_CLICK, { location: 'floating_cta' })}
            className="w-11 h-11 rounded-full bg-white shadow-medium border border-border flex items-center justify-center text-green-600 hover:shadow-strong transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>

          <motion.button
            onClick={() => { gtagEvent(EVENT_CTA_CLICK, { location: 'floating_cta', label: 'get_quote' }); openDrawer(); }}
            className="w-11 h-11 rounded-full bg-electric shadow-glow flex items-center justify-center text-white hover:bg-electric-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Get a Quote"
            aria-label="Get a Quote"
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── FINAL CTA SECTION ─── */

export function FinalCTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section ref={ref} id="inquiry" className="relative bg-ivory overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 184, 255, 0.1) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(77, 124, 254, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative section">
        <div className="container-brand">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                className="text-caption text-charcoal mb-5 block"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.normal, ease: easing.cinematic }}
              >
                Start Your Project
              </motion.span>

              <motion.h2
                className="text-display text-rich mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
              >
                Let Your Brand <span className="text-electric">Leave A Lasting Impression.</span>
              </motion.h2>

              <motion.p
                className="text-body-lg text-charcoal max-w-lg mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, delay: 0.16, ease: easing.cinematic }}
              >
                Most quotes delivered within 24 hours. No obligations, no pressure—
                just a conversation about making your brand tangible.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-charcoal mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.normal, delay: 0.24, ease: easing.cinematic }}
              >
                {[
                  'Free consultation',
                  '24-hour quote turnaround',
                  'No minimum order',
                ].map((text) => (
                  <span key={text} className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-electric flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {text}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.normal, delay: 0.32, ease: easing.cinematic }}
              >
                <Button onClick={() => { gtagEvent(EVENT_CTA_CLICK, { location: 'final_cta', label: 'request_quote' }); setFormOpen(true); }} variant="primary" size="lg">
                  Request a Quote
                </Button>
                <Button href="#contact" variant="secondary" size="lg">
                  Schedule a Call
                </Button>
              </motion.div>

              <motion.div
                className="mt-6 lg:mt-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: duration.normal, delay: 0.4 }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => gtagEvent(EVENT_WHATSAPP_CLICK, { location: 'final_cta' })}
                  className="inline-flex items-center gap-2 text-body-sm text-charcoal hover:text-electric transition-colors"
                >
                  <svg className="w-[18px] h-[18px] text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Or chat with us on WhatsApp
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: easing.cinematic }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <motion.div
                  className="absolute inset-[10%] rounded-3xl bg-white shadow-strong border border-border overflow-hidden"
                  animate={{ y: [0, -10, 0], rotate: [0, 0.8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-ivory to-ivory-50" />
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-20 rounded-xl bg-electric/8 flex items-center justify-center">
                    <div className="w-16 h-3 bg-electric/25 rounded-full" />
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 right-1/4 h-12 rounded-lg bg-ivory-200" />
                </motion.div>

                <motion.div
                  className="absolute -top-3 -right-3 w-20 h-20 bg-white rounded-2xl shadow-medium border border-border"
                  animate={{ y: [0, -6, 0], rotate: [4, 7, 4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-16 h-16 bg-white rounded-xl shadow-medium border border-border"
                  animate={{ y: [0, -5, 0], rotate: [-2, -0.5, -2] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {formOpen && <QuoteFormModal onClose={() => setFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

/* ─── QUOTE FORM MODAL ─── */

function QuoteFormModal({ onClose }: { onClose: () => void }) {
  const { formData: ctxFormData, submitted, isSubmitting, submitError, updateFormData, addProduct, removeProduct, submitQuote, resetQuote } = useQuote();
  const [step, setStep] = useState(1);
  const [localFormData, setLocalFormData] = useState(() => {
    const contextProductLabels = ctxFormData.products
      .map((p) => ID_TO_PRODUCT_LABEL[p.productId])
      .filter(Boolean) as string[];
    return {
      name: ctxFormData.name,
      company: ctxFormData.company,
      email: ctxFormData.email,
      phone: ctxFormData.phone,
      products: contextProductLabels,
      quantity: ctxFormData.budget,
      message: ctxFormData.message,
    };
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose();
        resetQuote();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose, resetQuote]);

  const updateField = (field: string, value: string | string[]) => {
    setLocalFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'name' || field === 'company' || field === 'email' || field === 'phone' || field === 'message') {
      updateFormData({ [field]: value });
    } else if (field === 'quantity') {
      updateFormData({ budget: value as string });
    }
  };

  const toggleProduct = (product: string) => {
    const updated = localFormData.products.includes(product)
      ? localFormData.products.filter((p) => p !== product)
      : [...localFormData.products, product];
    setLocalFormData((prev) => ({ ...prev, products: updated }));

    const productId = PRODUCT_LABEL_TO_ID[product];
    if (productId) {
      if (localFormData.products.includes(product)) {
        removeProduct(productId);
      } else {
        addProduct(productId);
      }
    }
  };

  const handleSubmit = async () => {
    updateFormData({
      name: localFormData.name,
      company: localFormData.company,
      email: localFormData.email,
      phone: localFormData.phone,
      budget: localFormData.quantity,
      message: localFormData.message,
    });
    await submitQuote();
  };

  // Focus trap + escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const productOptions = [
    'Coffee Mugs',
    'Bottles',
    'Employee Kits',
    'ID Cards',
    'Event Merch',
    'Packaging',
    'Corporate Gifts',
    'Notebooks',
  ];

  const quantityOptions = ['50-100', '100-500', '500-1000', '1000+', 'Not Sure'];

  return (
    <motion.div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-rich/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        className="relative bg-white rounded-2xl lg:rounded-3xl shadow-strong w-full max-w-lg max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: easing.cinematic }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-form-title"
      >
        <div className="sticky top-0 bg-white border-b border-border px-6 lg:px-8 py-5 flex items-center justify-between z-10">
          <div>
            <h3 id="quote-form-title" className="text-h3 text-rich">Request a Quote</h3>
            <p className="text-body-sm text-charcoal mt-0.5">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-ivory flex items-center justify-center hover:bg-ivory-200 transition-colors"
            aria-label="Close form"
          >
            <svg className="w-4 h-4 text-rich" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 lg:px-8 pt-5">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full flex-1 transition-all duration-300',
                  i <= step ? 'bg-electric' : 'bg-border'
                )}
              />
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: easing.cinematic }}
                className="flex flex-col items-center text-center space-y-4 py-8"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-h4 text-rich">Quote Submitted!</h4>
                <p className="text-body text-charcoal max-w-sm">
                  Thanks, {localFormData.name || 'there'}. We'll be in touch within 24 hours with your personalized quote.
                </p>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: easing.smooth }}
                    className="space-y-4"
                  >
                    <FormField label="Full Name" placeholder="John Smith" value={localFormData.name} onChange={(v) => updateField('name', v)} />
                    <FormField label="Company" placeholder="Acme Inc." value={localFormData.company} onChange={(v) => updateField('company', v)} />
                    <FormField label="Email" type="email" placeholder="john@company.com" value={localFormData.email} onChange={(v) => updateField('email', v)} />
                    <FormField label="Phone (optional)" type="tel" placeholder="+91 98765 43210" value={localFormData.phone} onChange={(v) => updateField('phone', v)} />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: easing.smooth }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-body-sm font-medium text-rich mb-3 block">Products Interested In</label>
                      <div className="flex flex-wrap gap-2">
                        {productOptions.map((product) => (
                          <ChipButton
                            key={product}
                            label={product}
                            selected={localFormData.products.includes(product)}
                            onClick={() => toggleProduct(product)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-body-sm font-medium text-rich mb-3 block">Quantity Range</label>
                      <div className="flex flex-wrap gap-2">
                        {quantityOptions.map((qty) => (
                          <ChipButton
                            key={qty}
                            label={qty}
                            selected={localFormData.quantity === qty}
                            onClick={() => updateField('quantity', qty)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25, ease: easing.smooth }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-body-sm font-medium text-rich mb-2 block">Project Details</label>
                      <textarea
                        value={localFormData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className="w-full py-3.5 px-[1.125rem] font-jakarta text-[0.9375rem] text-rich bg-surface border border-border rounded-md transition-[border-color,box-shadow] duration-200 ease-smooth placeholder:text-rich-500 placeholder:opacity-60 focus:border-electric focus:shadow-[0_0_0_3px_rgba(77,124,254,0.12)] focus:outline-none min-h-[120px] resize-none"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-electric-50 border border-electric/15">
                      <p className="text-body-sm text-electric font-medium">Most quotes delivered within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Error banner */}
          {submitError && !submitted && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-start gap-3">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">{submitError}</p>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="sticky bottom-0 bg-white border-t border-border px-6 lg:px-8 py-5 flex gap-3">
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)} variant="ghost">
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} variant="primary" className="ml-auto">
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="ml-auto"
                isLoading={isSubmitting}
              >
                Submit Quote Request
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── FORM HELPERS ─── */

const PRODUCT_LABEL_TO_ID: Record<string, string> = {
  'Coffee Mugs': 'custom-mugs',
  'Bottles': 'branded-bottles',
  'Employee Kits': 'employee-kits',
  'Packaging': 'packaging',
  'Corporate Gifts': 'corporate-gifts',
  'Notebooks': 'notebooks',
};

const ID_TO_PRODUCT_LABEL: Record<string, string> = {
  'custom-mugs': 'Coffee Mugs',
  'branded-bottles': 'Bottles',
  'employee-kits': 'Employee Kits',
  'packaging': 'Packaging',
  'corporate-gifts': 'Corporate Gifts',
  'notebooks': 'Notebooks',
};

function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-body-sm font-medium text-rich mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3.5 px-[1.125rem] font-jakarta text-[0.9375rem] text-rich bg-surface border border-border rounded-md transition-[border-color,box-shadow] duration-200 ease-smooth placeholder:text-rich-500 placeholder:opacity-60 focus:border-electric focus:shadow-[0_0_0_3px_rgba(77,124,254,0.12)] focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

function ChipButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        selected
          ? 'bg-electric text-white shadow-glow'
          : 'bg-ivory text-rich border border-border hover:border-electric'
      )}
    >
      {label}
    </button>
  );
}
