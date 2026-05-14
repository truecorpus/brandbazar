'use client';

import { motion } from 'framer-motion';
import { FAQCategory } from '@/lib/faq/types';
import { easing, duration } from '@/lib/animations';

interface FAQCategoryNavProps {
  categories: FAQCategory[];
  activeCategory: string | null;
  onSelect: (id: string | null) => void;
  counts: Record<string, number>;
}

export function FAQCategoryNav({ categories, activeCategory, onSelect, counts }: FAQCategoryNavProps) {
  return (
    <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-border/30">
      <div className="container-brand">
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
          <motion.button
            onClick={() => onSelect(null)}
            className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
              activeCategory === null
                ? 'bg-rich text-white shadow-soft'
                : 'bg-ivory/60 text-charcoal/60 hover:bg-ivory hover:text-charcoal'
            }`}
            whileTap={{ scale: 0.96 }}
          >
            All Questions
            <span className={`ml-2 text-xs ${activeCategory === null ? 'text-white/60' : 'text-charcoal/35'}`}>
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </span>
          </motion.button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelect(isActive ? null : cat.id)}
                className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-soft'
                    : 'bg-ivory/60 text-charcoal/60 hover:bg-ivory hover:text-charcoal'
                }`}
                style={isActive ? { backgroundColor: cat.accentColor } : {}}
                whileTap={{ scale: 0.96 }}
              >
                {cat.label}
                <span className={`ml-2 text-xs ${isActive ? 'text-white/60' : 'text-charcoal/35'}`}>
                  {counts[cat.id] || 0}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: cat.accentColor }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
