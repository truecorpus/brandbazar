'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-medium flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-rich" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-medium flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-rich" />
        </button>
      )}

      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-ivory to-transparent z-[5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-ivory to-transparent z-[5] pointer-events-none" />

      {/* Category Pills */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Link href="/blog">
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
              transition-all duration-300 border
              ${!activeCategory
                ? 'bg-rich text-white border-rich shadow-medium'
                : 'bg-white/80 text-charcoal border-border hover:border-charcoal/30'
              }
            `}
          >
            All Stories
          </motion.span>
        </Link>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <Link key={category.id} href={`/blog/category/${category.slug}`}>
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                  transition-all duration-300 border
                  ${isActive
                    ? 'text-white shadow-medium'
                    : 'bg-white/80 text-charcoal border-border hover:border-charcoal/30'
                  }
                `}
                style={isActive ? { backgroundColor: category.color, borderColor: category.color } : {}}
              >
                {category.name}
                <span className={`ml-2 text-xs ${isActive ? 'text-white/70' : 'text-charcoal/40'}`}>
                  {category.articleCount}
                </span>
              </motion.span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
