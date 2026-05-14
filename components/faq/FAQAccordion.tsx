'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItem, FAQCategory } from '@/lib/faq/types';
import { easing, duration } from '@/lib/animations';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  items: FAQItem[];
  categories: FAQCategory[];
  categoryId?: string;
}

function getCategoryById(categories: FAQCategory[], id: string): FAQCategory | undefined {
  return categories.find((c) => c.id === id);
}

function FAQCard({ item, categories, index }: { item: FAQItem; categories: FAQCategory[]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);
  const category = getCategoryById(categories, item.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: duration.slow, ease: easing.cinematic }}
      className="group"
    >
      <div
        className={cn(
          'relative rounded-2xl border transition-all duration-500 overflow-hidden',
          isOpen
            ? 'bg-white border-electric/15 shadow-soft'
            : 'bg-white/60 border-border/20 hover:border-electric/10 hover:bg-white hover:shadow-soft'
        )}
      >
        {/* Category indicator stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300"
          style={{
            backgroundColor: category?.accentColor || '#4D7CFE',
            opacity: isOpen ? 1 : 0,
          }}
        />

        {/* Question header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start gap-4 p-6 lg:p-8 text-left"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              {category && (
                <span
                  className="text-xs font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${category.accentColor}10`,
                    color: category.accentColor,
                  }}
                >
                  {category.label}
                </span>
              )}
            </div>
            <h3 className={cn(
              'font-poppins text-base lg:text-lg font-semibold leading-[1.4] transition-colors duration-300 pr-4',
              isOpen ? 'text-electric' : 'text-rich group-hover:text-electric'
            )}>
              {item.question}
            </h3>
          </div>

          <div
            className={cn(
              'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300',
              isOpen
                ? 'bg-electric text-white rotate-0'
                : 'bg-ivory text-charcoal/40 group-hover:bg-electric/10 group-hover:text-electric'
            )}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Minus className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>

        {/* Answer body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: 500, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: easing.cinematic }}
              className="overflow-hidden"
            >
              <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="pt-2 border-t border-border/10">
                    <p className="text-sm text-charcoal/60 leading-[1.8] pt-5 max-w-[720px]">
                      {item.answer}
                    </p>

                    {/* Related links */}
                    {item.relatedLinks && item.relatedLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {item.relatedLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-full text-xs font-medium bg-ivory/80 text-charcoal/60 hover:bg-electric/10 hover:text-electric transition-colors duration-200 min-h-[44px]"
                          >
                            {link.label}
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Helpful feedback */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/10">
                      <span className="text-xs text-charcoal/40">Was this helpful?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setWasHelpful(true)}
                          className={cn(
                            'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[44px]',
                            wasHelpful === true
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-ivory/60 text-charcoal/40 hover:bg-ivory hover:text-charcoal'
                          )}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setWasHelpful(false)}
                          className={cn(
                            'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 min-h-[44px]',
                            wasHelpful === false
                              ? 'bg-red-50 text-red-500 border border-red-200'
                              : 'bg-ivory/60 text-charcoal/40 hover:bg-ivory hover:text-charcoal'
                          )}
                        >
                          No
                        </button>
                      </div>
                      {wasHelpful === false && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs text-charcoal/40"
                        >
                          <Link href="/contact" className="text-electric hover:underline">Contact us</Link> — we are here to help.
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FAQAccordion({ items, categories, categoryId }: FAQAccordionProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <p className="font-poppins text-lg text-charcoal/40 mb-2">No questions found</p>
        <p className="text-sm text-charcoal/30">Try a different search term or browse all categories.</p>
      </motion.div>
    );
  }

  const category = categoryId ? getCategoryById(categories, categoryId) : null;

  return (
    <div className="space-y-3">
      {category && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-poppins text-2xl font-bold text-rich mb-2">{category.label}</h2>
          <p className="text-sm text-charcoal/45">{category.description}</p>
        </motion.div>
      )}

      {items.map((item, i) => (
        <FAQCard key={item.id} item={item} categories={categories} index={i} />
      ))}
    </div>
  );
}
