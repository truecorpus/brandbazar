'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly will I hear back after submitting?',
    answer: 'We respond to every consultation request within 24 business hours. For urgent projects, we recommend reaching out via WhatsApp for immediate availability.',
  },
  {
    question: 'Is the initial consultation free?',
    answer: 'Yes. Our first consultation is completely complimentary. We believe you should understand our approach and capabilities before making any commitment.',
  },
  {
    question: 'What information should I prepare before contacting?',
    answer: 'Helpful details include: your company size, project timeline, approximate quantity, and any brand guidelines you have. But do not worry if you are still figuring things out — we help clarify scope during our conversation.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely. We have delivered branding solutions to clients across 12 countries. Our team handles international shipping, customs, and localization requirements.',
  },
  {
    question: 'What is your minimum order quantity?',
    answer: 'Minimums vary by product type. Most custom merchandise starts at 50 units. Packaging at 250 units. For enterprise programs, we offer flexible arrangements.',
  },
  {
    question: 'Can I see samples before committing?',
    answer: 'Yes. We offer sample programs for all product categories. Physical samples allow you to evaluate quality, materials, and branding execution before production.',
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative section-sm border-t border-border/20">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[720px] mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">COMMON QUESTIONS</span>
            <h2 className="font-poppins text-h2 text-rich text-wrap-balance">
              What clients typically ask
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
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
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      openIndex === i ? 'bg-electric/10' : 'bg-ivory-100'
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="w-4 h-4 text-electric" />
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
                        <div className="h-px bg-electric/10 mb-4" />
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
