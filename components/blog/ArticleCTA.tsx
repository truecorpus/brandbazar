'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { easing, duration } from '@/lib/animations';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ArticleCTAProps {
  variant?: 'inline' | 'full';
}

export function ArticleCTA({ variant = 'inline' }: ArticleCTAProps) {
  if (variant === 'full') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: duration.slow, ease: easing.cinematic }}
        className="section-sm"
      >
        <div className="container-brand">
          <div className="max-w-[65ch] mx-auto">
            <div className="relative p-10 lg:p-14 bg-rich rounded-2xl overflow-hidden">
              {/* Ambient glows */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-electric/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-lavender/8 blur-3xl" />

              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-lavender/20 mb-6">
                  <Sparkles className="w-5 h-5 text-electric" />
                </div>

                <h3 className="font-poppins text-2xl lg:text-3xl font-semibold text-white mb-4 text-wrap-balance">
                  Ready to Elevate Your Brand?
                </h3>
                <p className="text-white/55 max-w-md mx-auto mb-8 leading-relaxed">
                  Every touchpoint is an opportunity. Let us help you create brand experiences that your audience remembers.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="btn btn-primary inline-flex"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/solutions"
                    className="btn inline-flex bg-white/10 text-white border-white/10 hover:bg-white/15 hover:border-white/20"
                  >
                    Explore Solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Inline variant — elegant separator with CTA
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
      className="my-14 lg:my-20 max-w-[65ch]"
    >
      <div className="relative py-10 px-8 lg:px-10 bg-gradient-to-br from-ivory-50 to-white border border-border/30 rounded-2xl text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-border/40 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-electric" />
        </div>

        <p className="text-[17px] text-charcoal/70 leading-relaxed mb-5 text-wrap-balance">
          Want to apply these insights to your own brand? Our team helps companies build memorable brand experiences through strategic merchandise and identity design.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-electric-600 transition-colors group"
        >
          Build Your Brand Experience
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
