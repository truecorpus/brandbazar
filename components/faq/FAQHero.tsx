'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Search } from 'lucide-react';

interface FAQHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  isSearching: boolean;
}

export function FAQHero({ searchQuery, onSearchChange, resultCount, isSearching }: FAQHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
      <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <div className="relative z-10 container-brand text-center py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
          className="text-caption text-charcoal/35 tracking-[0.2em] mb-6"
        >
          CLARITY, BEFORE COMMITMENT
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
          className="font-poppins text-[40px] sm:text-[56px] lg:text-[64px] font-bold text-rich leading-[1.05] tracking-[-0.03em] text-wrap-balance max-w-[900px] mx-auto mb-5"
        >
          Questions worth <span className="text-electric">answering</span> well
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.5 }}
          className="text-[17px] text-charcoal/50 leading-[1.7] max-w-[520px] mx-auto mb-10"
        >
          Everything you need to know about working with us — answered with the same care we put into your products.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.65 }}
          className="max-w-[560px] mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-electric/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white rounded-2xl border border-border/40 shadow-soft group-focus-within:shadow-medium group-focus-within:border-electric/20 transition-all duration-300">
              <Search className="w-5 h-5 text-charcoal/30 ml-5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search questions, topics, or keywords..."
                className="flex-1 py-4 px-4 bg-transparent text-[15px] text-rich placeholder:text-charcoal/30 focus:outline-none"
              />
              {isSearching && (
                <span className="text-caption text-charcoal/35 mr-5">
                  {resultCount} result{resultCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
