'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/config';

interface SolutionCTAProps {
  solution: SolutionData;
}

export function SolutionCTA({ solution }: SolutionCTAProps) {
  return (
    <section className="relative section overflow-hidden bg-rich">
      {/* Atmospheric */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-electric/[0.05] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.03] blur-[100px]" />
        <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      </div>

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[800px] mx-auto text-center"
        >
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-white/15" />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: solution.heroAccent }}
            />
            <span className="w-12 h-px bg-white/15" />
          </div>

          <h2 className="font-poppins text-[32px] lg:text-[48px] xl:text-[56px] font-bold text-white leading-[1.05] tracking-[-0.03em] text-wrap-balance mb-6">
            {solution.ctaHeadline}
          </h2>

          <p className="text-[17px] text-white/45 leading-[1.7] max-w-[520px] mx-auto mb-12">
            {solution.ctaSubheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar%2C%20I%20am%20interested%20in%20your%20`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 bg-white/10 text-white border-white/10 hover:bg-white/15 hover:border-white/20 px-8 py-4"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
