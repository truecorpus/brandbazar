'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { Plus, Minus } from 'lucide-react';

interface SolutionFAQProps {
  solution: SolutionData;
}

export function SolutionFAQ({ solution }: SolutionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative section-sm overflow-hidden bg-white">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[720px] mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">QUESTIONS</span>
            <h2 className="font-poppins text-[32px] lg:text-[40px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
              What clients ask us
            </h2>
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {solution.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: duration.slow, ease: easing.cinematic }}
                className="rounded-xl border border-border/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left hover:bg-ivory-50/50 transition-colors"
                >
                  <span className="font-poppins text-[15px] lg:text-base font-semibold text-rich pr-4">
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: openIndex === i ? `${solution.heroAccent}15` : '#f5f1e8',
                    }}
                  >
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" style={{ color: solution.heroAccent }} />
                    ) : (
                      <Plus className="w-4 h-4 text-charcoal/40" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ maxHeight: 0, opacity: 0 }}
                      animate={{ maxHeight: 500, opacity: 1 }}
                      exit={{ maxHeight: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easing.smooth }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                        <div
                          className="h-px mb-4"
                          style={{ backgroundColor: `${solution.heroAccent}15` }}
                        />
                        <p className="text-[15px] text-charcoal/60 leading-[1.7]">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
