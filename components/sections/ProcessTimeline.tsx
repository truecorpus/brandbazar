'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProcessPath } from '@/components/process/ProcessPath';
import { easing, duration } from '@/lib/animations';

export function ProcessTimeline() {
  const introRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(introRef, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-ivory overflow-hidden">
      <div ref={introRef} className="section">
        <div className="container-brand">
          <div className="max-w-4xl">
            <motion.span
              className="text-caption text-charcoal mb-5 block"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, ease: easing.cinematic }}
            >
              Our Process
            </motion.span>

            <motion.h2
              className="text-display-md text-rich mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
            >
              Where Ideas Become <span className="text-electric">Brand Experiences.</span>
            </motion.h2>

            <motion.p
              className="text-body-lg text-charcoal max-w-2xl"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.16, ease: easing.cinematic }}
            >
              A refined seven-stage journey designed for precision, transparency, 
              and exceptional results — every single time.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container-brand pb-24 lg:pb-40">
        <ProcessPath />
      </div>

      {/* Bottom CTA */}
      <div className="section-sm bg-ivory-50 border-t border-border">
        <div className="container-brand">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-50 text-electric mb-5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Average turnaround: 10-14 days</span>
            </div>
            <h3 className="text-h2 text-rich mb-4">Ready to start your project?</h3>
            <p className="text-body-lg text-charcoal mb-7">
              Most quotes delivered within 24 hours. No obligations, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#inquiry" className="btn btn-primary btn-lg">
                Get Your Quote
              </a>
              <a href="#contact" className="btn btn-secondary btn-lg">
                Schedule a Call
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
