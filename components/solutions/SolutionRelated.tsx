'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SolutionData } from '@/lib/solutions/types';
import { getRelatedSolutions } from '@/lib/solutions/data';
import { easing, duration } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

interface SolutionRelatedProps {
  solution: SolutionData;
}

export function SolutionRelated({ solution }: SolutionRelatedProps) {
  const related = getRelatedSolutions(solution.relatedSlugs);
  if (related.length === 0) return null;

  return (
    <section className="relative section-sm border-t border-border/30">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-[2px] bg-electric" />
            <span className="text-caption text-charcoal/40 tracking-widest">EXPLORE MORE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
              >
                <Link href={`/solutions/${item.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.heroGradient} transition-transform duration-700 ease-cinematic group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 texture-dots opacity-[0.02]" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-flex px-3 py-1 rounded-full text-caption bg-white/90 backdrop-blur-sm"
                        style={{ color: item.heroAccent }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <ArrowUpRight className="w-3.5 h-3.5 text-rich" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-poppins text-base font-semibold text-rich group-hover:text-electric transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-1 line-clamp-2">{item.subheadline}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
