'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { easing, duration } from '@/lib/animations';
import { ArrowRight, Mail } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="relative section overflow-hidden bg-rich">
      {/* Atmospheric layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-electric/[0.06] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px]" />
        <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      </div>

      <div className="container-brand relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-px bg-white/15" />
              <span className="text-caption text-white/30 tracking-[0.2em]">LET&apos;S CREATE</span>
              <span className="w-12 h-px bg-white/15" />
            </div>

            {/* Headline */}
            <h2 className="font-poppins text-[36px] lg:text-[52px] xl:text-[60px] font-bold text-white leading-[1.05] tracking-[-0.03em] text-wrap-balance mb-8">
              Ready to make your brand
              <br />
              <span className="text-electric">impossible to forget?</span>
            </h2>

            <p className="text-[17px] text-white/45 leading-[1.7] max-w-[500px] mx-auto mb-12">
              Every project begins with a conversation. Tell us what you are building, and we will show you how thoughtful branding can transform it.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:hello@brandbazar.com"
                className="btn inline-flex items-center gap-2 bg-white/10 text-white border-white/10 hover:bg-white/15 hover:border-white/20 px-8 py-4"
              >
                <Mail className="w-4 h-4" />
                hello@brandbazar.com
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-white/25">
              <span>500+ Brands Served</span>
              <span className="w-1 h-1 rounded-full bg-white/15 hidden sm:block" />
              <span>48-Hour Response</span>
              <span className="w-1 h-1 rounded-full bg-white/15 hidden sm:block" />
              <span>Global Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
