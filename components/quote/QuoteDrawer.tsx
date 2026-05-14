'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ClipboardList, ArrowRight, Trash2 } from 'lucide-react';
import { useQuote } from '@/lib/quote/QuoteContext';
import { useQuoteDrawer } from './QuoteDrawerProvider';
import { getProductById } from '@/lib/quote/data';
import { Button } from '@/components/ui/Button';
import { easing, duration } from '@/lib/animations';
import { gtagEvent, EVENT_DRAWER_OPEN, EVENT_CTA_CLICK } from '@/lib/analytics';
import { cn } from '@/lib/utils';

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const selector =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, containerRef]);
}

export function QuoteDrawer() {
  const { isOpen, closeDrawer } = useQuoteDrawer();
  const { formData, removeProduct, resetQuote } = useQuote();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true;
      gtagEvent(EVENT_DRAWER_OPEN, { product_count: formData.products.length });
    }
    if (!isOpen) {
      wasOpenRef.current = false;
    }
  }, [isOpen, formData.products.length]);

  useFocusTrap(isOpen, drawerRef);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeDrawer]);

  const handleRemove = (productId: string) => {
    removeProduct(productId);
  };

  const handleClearAll = () => {
    resetQuote();
  };

  const productCount = formData.products.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 isolate">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-rich/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: easing.smooth }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-drawer-title"
            className={cn(
              'absolute top-0 right-0 h-full bg-ivory shadow-strong overflow-hidden flex flex-col',
              'w-full max-w-md border-l border-border sm:rounded-l-2xl'
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: duration.normal, ease: easing.cinematic }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/40 bg-white/50 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 id="quote-drawer-title" className="text-h4 text-rich font-semibold">
                  Your Quote
                </h2>
                <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 bg-electric text-white text-xs font-bold rounded-full">
                  {productCount}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="w-11 h-11 rounded-full bg-ivory flex items-center justify-center hover:bg-ivory-200 transition-colors"
                aria-label="Close quote drawer"
              >
                <X className="w-4 h-4 text-rich" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {productCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center">
                    <ClipboardList className="w-7 h-7 text-charcoal" />
                  </div>
                  <p className="text-body text-charcoal max-w-xs">
                    No products yet. Browse our products to get started.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-electric hover:underline"
                  >
                    Browse Products
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {formData.products.map((product) => {
                      const details = getProductById(product.productId);
                      return (
                        <motion.li
                          key={product.productId}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: duration.fast, ease: easing.smooth }}
                          className="flex items-center justify-between p-4 rounded-xl bg-white border border-border shadow-soft"
                        >
                          <div className="min-w-0">
                            <p className="text-body-sm font-medium text-rich truncate">
                              {details?.name || product.productId}
                            </p>
                            <p className="text-caption text-charcoal mt-0.5">
                              Qty: {product.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(product.productId)}
                            className="ml-3 w-11 h-11 rounded-full bg-ivory flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                            aria-label={`Remove ${details?.name || product.productId}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border/40 bg-white/50 backdrop-blur-md shrink-0 space-y-3">
              <Button
                href="/quote"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => {
                  gtagEvent(EVENT_CTA_CLICK, { location: 'quote_drawer', label: 'continue_to_builder' });
                  closeDrawer();
                }}
              >
                Continue to Quote Builder
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              {productCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="w-full flex items-center justify-center gap-1.5 text-body-sm text-charcoal hover:text-red-500 transition-colors py-2 min-h-[44px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
