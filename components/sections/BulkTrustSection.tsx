'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { easing, duration } from '@/lib/animations';

/* ─── DATA ─── */

const stats = [
  { value: 50000, suffix: '+', label: 'Products Delivered', desc: 'Consistent quality at every scale' },
  { value: 98, suffix: '%', label: 'On-Time Delivery', desc: 'Your deadlines are our priority' },
  { value: 99.7, suffix: '%', label: 'Quality Pass Rate', desc: 'Rigorous inspection at every stage', isDecimal: true },
  { value: 500, suffix: '+', label: 'Corporate Clients', desc: 'Trusted by teams of all sizes' },
];

const checkpoints = [
  {
    title: 'Material Verification',
    desc: 'Every batch tested for durability and finish quality',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Color Accuracy',
    desc: 'Pantone-matched printing with digital proofing',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Print Precision',
    desc: 'Resolution-checked at 300+ DPI for crisp branding',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Packaging Integrity',
    desc: 'Protective wrapping ensures pristine arrival',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Quantity Verification',
    desc: 'Automated counting with ±0.1% accuracy',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Final Inspection',
    desc: 'Every item hand-checked before dispatch',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

const workflow = [
  { label: 'Order Received', time: 'Hour 0' },
  { label: 'Design Confirmed', time: 'Day 1' },
  { label: 'Production Started', time: 'Day 2' },
  { label: 'Quality Check', time: 'Day 6' },
  { label: 'Packaging', time: 'Day 8' },
  { label: 'Shipped', time: 'Day 10' },
];

/* ─── MAIN SECTION ─── */

export function BulkTrustSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-rich text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-electric/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-lavender/4 blur-[100px] pointer-events-none" />

      <div ref={headerRef} className="relative section">
        <div className="container-brand">
          <div className="max-w-4xl">
            <motion.span
              className="text-caption text-white/35 mb-5 block"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, ease: easing.cinematic }}
            >
              Enterprise Ready
            </motion.span>

            <motion.h2
              className="text-display-md text-white mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 28 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
            >
              Built for Brands That <span className="text-electric">Expect Excellence.</span>
            </motion.h2>

            <motion.p
              className="text-body-lg text-white/55 max-w-2xl"
              initial={{ opacity: 0, y: 28 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.16, ease: easing.cinematic }}
            >
              From 50 units to 50,000, we deliver the same premium quality 
              with operational precision your business can rely on.
            </motion.p>
          </div>
        </div>
      </div>

      <StatsGrid />
      <WorkflowTimeline />
      <QualityGrid />
      <TrustBanner />
    </section>
  );
}

/* ─── STATS GRID ─── */

function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative pb-16 lg:pb-24">
      <div className="container-brand">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-5 lg:p-7 rounded-2xl bg-white/4 border border-white/8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: index * 0.08, ease: easing.cinematic }}
            >
              <span className="text-display-sm text-white font-poppins font-bold block mb-2">
                {stat.isDecimal ? (
                  <>{stat.value}<span className="text-electric">{stat.suffix}</span></>
                ) : (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className="text-display-sm text-white font-poppins font-bold"
                  />
                )}
              </span>
              <span className="text-body font-medium text-white block mb-1">{stat.label}</span>
              <span className="text-body-sm text-white/35">{stat.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── WORKFLOW TIMELINE ─── */

function WorkflowTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="relative py-16 lg:py-24 border-y border-white/8">
      <div className="container-brand">
        <motion.div
          className="text-center mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.normal, ease: easing.cinematic }}
        >
          <span className="text-caption text-white/35 mb-3 block">Timeline</span>
          <h3 className="text-h2 text-white">From order to doorstep.</h3>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute top-4 left-0 right-0 h-px bg-white/8 hidden lg:block">
            <motion.div
              className="h-full bg-electric origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: easing.cinematic }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {workflow.map((step, index) => (
              <motion.div
                key={step.label}
                className="relative text-center lg:text-left"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1, ease: easing.cinematic }}
              >
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-electric mx-auto lg:mx-0 mb-3 relative hidden lg:block"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 rounded-full bg-electric animate-ping opacity-15" />
                </motion.div>

                <div className="lg:hidden w-2 h-2 rounded-full bg-electric mx-auto mb-2.5" />

                <span className="text-caption text-electric block mb-1.5">{step.time}</span>
                <span className="text-body font-medium text-white block">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── QUALITY GRID ─── */

function QualityGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="relative py-16 lg:py-24">
      <div className="container-brand">
        <motion.div
          className="text-center mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.normal, ease: easing.cinematic }}
        >
          <span className="text-caption text-white/35 mb-3 block">Quality Assurance</span>
          <h3 className="text-h2 text-white">Six checkpoints. Zero compromise.</h3>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {checkpoints.map((checkpoint, index) => (
            <motion.div
              key={checkpoint.title}
              className="group p-5 lg:p-6 rounded-xl bg-white/4 border border-white/8 backdrop-blur-sm hover:bg-white/8 hover:border-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08, ease: easing.cinematic }}
            >
              <div className="w-10 h-10 rounded-lg bg-electric/15 flex items-center justify-center text-electric mb-3 group-hover:bg-electric/25 transition-colors duration-300">
                {checkpoint.icon}
              </div>
              <h4 className="text-h4 text-white mb-1.5">{checkpoint.title}</h4>
              <p className="text-body-sm text-white/40">{checkpoint.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TRUST BANNER ─── */

function TrustBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="relative py-16 lg:py-24 bg-white/4">
      <div className="container-brand">
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-electric/15 border border-electric/25 mb-7">
            <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-electric">ISO 9001 Certified Production</span>
          </div>

          <h3 className="text-h2 text-white mb-3">Your brand is safe with us.</h3>
          <p className="text-body-lg text-white/55 mb-7">
            Every order — regardless of size — goes through the same rigorous 
            quality assurance process. Consistency is not optional.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="#inquiry" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button href="#contact" variant="secondary" size="lg" className="border-white/15 text-white hover:bg-white/8 hover:border-white/30 hover:text-white">
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
