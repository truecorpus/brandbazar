'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const productCategories = [
  { name: 'Custom Coffee Mugs', href: '/products/mugs', desc: 'Daily brand touchpoints' },
  { name: 'Branded Bottles', href: '/products/bottles', desc: 'Hydration that travels' },
  { name: 'Employee Kits', href: '/products/employee-kits', desc: 'Welcome experiences' },
  { name: 'ID Cards & Lanyards', href: '/products/id-cards', desc: 'Identity with pride' },
  { name: 'Event Merchandise', href: '/products/events', desc: 'Memorable touchpoints' },
  { name: 'Custom Packaging', href: '/products/packaging', desc: 'The unboxing moment' },
];

const useCases = [
  { name: 'Employee Onboarding', href: '/solutions/onboarding' },
  { name: 'Conference & Events', href: '/solutions/events' },
  { name: 'Client Gifting', href: '/solutions/gifting' },
  { name: 'Brand Launch Kits', href: '/solutions/launch' },
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-rich/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Mega Menu Panel */}
          <motion.div
            ref={menuRef}
            className="absolute top-full left-0 right-0 z-50 bg-white border-b border-border shadow-strong overflow-hidden"
            initial={{ opacity: 0, y: -10, maxHeight: 0 }}
            animate={{ opacity: 1, y: 0, maxHeight: 1000 }}
            exit={{ opacity: 0, y: -10, maxHeight: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-brand py-10 lg:py-14">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Column 1: By Category */}
                <div className="lg:col-span-5">
                  <span className="text-caption text-charcoal mb-6 block">By Product</span>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {productCategories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={category.href}
                          onClick={onClose}
                          className="group block"
                        >
                          <span className="text-body font-medium text-rich group-hover:text-electric transition-colors duration-200 block">
                            {category.name}
                          </span>
                          <span className="text-body-sm text-charcoal/60 group-hover:text-charcoal transition-colors duration-200">
                            {category.desc}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Column 2: By Use Case */}
                <div className="lg:col-span-3">
                  <span className="text-caption text-charcoal mb-6 block">By Use Case</span>
                  <div className="space-y-3">
                    {useCases.map((useCase, index) => (
                      <motion.div
                        key={useCase.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={useCase.href}
                          onClick={onClose}
                          className="group flex items-center gap-2 text-body text-rich hover:text-electric transition-colors duration-200"
                        >
                          <span>{useCase.name}</span>
                          <svg 
                            className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Featured CTA */}
                <div className="lg:col-span-4">
                  <motion.div
                    className="relative h-full min-h-[200px] rounded-2xl overflow-hidden bg-ivory p-6 flex flex-col justify-between"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div>
                      <span className="text-caption text-charcoal mb-2 block">Not sure what you need?</span>
                      <h4 className="text-h4 text-rich mb-2">Let&apos;s talk branding.</h4>
                      <p className="text-body-sm text-charcoal">
                        Our team will help you find the perfect products for your brand.
                      </p>
                    </div>
                    <Button
                      href="/get-a-quote"
                      onClick={onClose}
                      variant="primary"
                      size="sm"
                      className="mt-4 w-fit"
                    >
                      Get a Free Consultation
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
