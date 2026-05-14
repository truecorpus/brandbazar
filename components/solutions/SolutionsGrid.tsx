'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

interface SolutionsGridProps {
  solutions: SolutionData[];
}

export function SolutionsGrid({ solutions }: SolutionsGridProps) {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
            >
              <Link href={`/solutions/${solution.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-white border border-border/30 hover:border-electric/15 hover:shadow-strong transition-all duration-500">
                  {/* Gradient header area */}
                  <div
                    className={`relative h-48 lg:h-56 bg-gradient-to-br ${solution.heroGradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 texture-dots opacity-[0.02]" />

                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-charcoal/[0.04] group-hover:scale-150 group-hover:border-electric/10 transition-all duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/[0.02] group-hover:bg-electric/[0.03] transition-colors duration-500" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex px-3 py-1.5 rounded-full text-caption bg-white/90 backdrop-blur-sm"
                        style={{ color: solution.heroAccent }}
                      >
                        {solution.category}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-medium flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-rich" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="font-poppins text-xl lg:text-2xl font-semibold text-rich mb-2 group-hover:text-electric transition-colors duration-300 text-wrap-balance">
                      {solution.name}
                    </h3>
                    <p className="text-[15px] text-charcoal/55 leading-[1.7] mb-4">
                      {solution.subheadline}
                    </p>

                    {/* Stats preview */}
                    <div className="flex gap-6 pt-4 border-t border-border/20">
                      {solution.stats.slice(0, 2).map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="font-poppins text-lg font-bold leading-none"
                            style={{ color: solution.heroAccent }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-xs text-charcoal/40 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
