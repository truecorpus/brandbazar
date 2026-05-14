'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { processSteps } from './ProcessData';
import { cn } from '@/lib/utils';
import { easing, duration } from '@/lib/animations';

export function ProcessPath() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.15'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      {/* SVG Path - Desktop */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-electric origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Steps */}
      <div className="relative space-y-0">
        {processSteps.map((step, index) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className={cn(
        'relative py-14 lg:py-20',
        index % 2 === 0 ? 'lg:pr-[52%]' : 'lg:pl-[52%]'
      )}
    >
      {/* Center dot - Desktop */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-medium relative z-10"
          style={{ backgroundColor: step.accentColor }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: step.accentColor }}
          animate={isInView ? { scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Mobile dot */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 lg:hidden"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-soft"
          style={{ backgroundColor: step.accentColor }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={cn(
          'lg:max-w-lg',
          index % 2 === 0 ? 'lg:ml-auto lg:text-right' : 'lg:mr-auto'
        )}
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
      >
        {/* Step number */}
        <span
          className="text-[5rem] lg:text-[7rem] font-poppins font-bold leading-none block mb-1 opacity-[0.035] select-none"
          style={{ color: step.accentColor }}
        >
          {step.number}
        </span>

        {/* Label */}
        <div className={cn('flex items-center gap-3 mb-2', index % 2 === 0 ? 'lg:justify-end' : '')}>
          <span className="text-caption font-medium" style={{ color: step.accentColor }}>
            {step.title}
          </span>
          <span className="text-caption text-charcoal/35">{step.duration}</span>
        </div>

        {/* Headline */}
        <h3 className="text-h2 text-rich mb-3">{step.headline}</h3>

        {/* Description */}
        <p className="text-body-lg text-charcoal mb-4">{step.description}</p>

        {/* Trust point */}
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full border',
            index % 2 === 0 ? 'lg:ml-auto' : ''
          )}
          style={{ borderColor: `${step.accentColor}25`, backgroundColor: `${step.accentColor}06` }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: step.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-body-sm font-medium text-rich">{step.trustPoint}</span>
        </div>
      </motion.div>
    </div>
  );
}
