'use client';

import { motion } from 'framer-motion';
import { FAQItem, FAQCategory } from '@/lib/faq/types';
import { easing, duration } from '@/lib/animations';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FAQSuggestedProps {
  items: FAQItem[];
  categories: FAQCategory[];
  onSelect: (item: FAQItem) => void;
}

export function FAQSuggested({ items, categories, onSelect }: FAQSuggestedProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory/30 to-white" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="flex items-center gap-3 mb-10"
        >
          <Sparkles className="w-5 h-5 text-electric" />
          <h2 className="font-poppins text-xl font-semibold text-rich">Most asked questions</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const category = categories.find((c) => c.id === item.categoryId);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06, duration: duration.slow, ease: easing.cinematic }}
                onClick={() => onSelect(item)}
                className="group text-left p-6 rounded-2xl bg-white border border-border/20 hover:border-electric/10 hover:shadow-soft transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  {category && (
                    <span
                      className="text-xs font-medium tracking-wide uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: `${category.accentColor}10`,
                        color: category.accentColor,
                      }}
                    >
                      {category.label}
                    </span>
                  )}
                  <ArrowUpRight className="w-4 h-4 text-charcoal/20 group-hover:text-electric group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </div>
                <h3 className="font-poppins text-[15px] font-semibold text-rich leading-[1.5] group-hover:text-electric transition-colors">
                  {item.question}
                </h3>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
