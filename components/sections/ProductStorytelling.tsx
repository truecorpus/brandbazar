'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easing, duration } from '@/lib/animations';

/* ─── INTRO SECTION ─── */

function SectionIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="section bg-ivory">
      <div className="container-brand">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slower, ease: easing.cinematic }}
        >
          <span className="text-caption text-charcoal mb-5 block">What We Craft</span>
          <h2 className="text-display-md text-rich mb-6 lg:mb-8">
            Branding people actually <span className="text-electric">remember.</span>
          </h2>
          <p className="text-body-lg text-charcoal max-w-2xl">
            Every product is an opportunity to make your brand tangible. 
            We transform everyday objects into extraordinary brand experiences 
            that leave lasting impressions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── PRODUCT SHOWCASE COMPONENTS ─── */

interface ProductShowcaseProps {
  headline: string;
  description: string;
  tagline: string;
  layout: 'split-left' | 'split-right' | 'centered' | 'full-bleed';
  children: React.ReactNode;
  accentColor?: string;
  index: number;
}

function ProductShowcase({ headline, description, tagline, layout, children, accentColor = '#4D7CFE', index }: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative py-20 lg:py-28 overflow-hidden',
        index % 2 === 0 ? 'bg-ivory' : 'bg-ivory-50'
      )}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? '30%' : '70%'} 50%, ${accentColor}, transparent 60%)`,
        }}
      />

      <motion.div className="container-brand relative" style={{ scale }}>
        {layout === 'full-bleed' ? (
          <div className="relative">
            <motion.div style={{ y }} className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-strong border border-border">
              {children}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-14 bg-gradient-to-t from-rich/80 via-rich/25 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: duration.slow, delay: 0.15, ease: easing.cinematic }}
                >
                  <span className="text-caption text-white/50 mb-2 block">{tagline}</span>
                  <h3 className="text-display-sm text-white mb-3">{headline}</h3>
                  <p className="text-body-lg text-white/75 max-w-lg">{description}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : layout === 'centered' ? (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
              className="mb-12 lg:mb-16 max-w-2xl"
            >
              <span className="text-caption text-charcoal mb-3 block">{tagline}</span>
              <h3 className="text-display-sm text-rich mb-4">{headline}</h3>
              <p className="text-body-lg text-charcoal">{description}</p>
            </motion.div>
            <motion.div style={{ y }} className="relative w-full max-w-4xl">
              {children}
            </motion.div>
          </div>
        ) : (
          <div className={cn(
            'grid lg:grid-cols-2 gap-10 lg:gap-16 items-center',
            layout === 'split-right' ? '' : ''
          )}>
            <motion.div
              className={cn('relative', layout === 'split-right' ? 'lg:order-2' : 'lg:order-1')}
              style={{ y }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {children}
              </div>
            </motion.div>

            <div className={layout === 'split-right' ? 'lg:order-1 lg:text-right' : 'lg:order-2'}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, ease: easing.cinematic }}
              >
                <span className="text-caption text-charcoal mb-3 block">{tagline}</span>
                <h3 className="text-display-sm text-rich mb-4 lg:mb-5">{headline}</h3>
                <p className="text-body-lg text-charcoal mb-6 lg:mb-8 max-w-md">{description}</p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-rich font-semibold group"
                >
                  <span className="relative">
                    Explore
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-electric group-hover:w-full transition-all duration-300 ease-cinematic" />
                  </span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── PRODUCT VISUALS ─── */

function MugVisual() {
  return (
    <motion.div
      className="absolute inset-[10%]"
      animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-full h-full rounded-2xl bg-gradient-to-b from-white via-ivory to-ivory-200 shadow-strong border border-border/40 relative overflow-hidden">
        <div className="absolute -right-3 top-1/4 w-4 h-1/2 border-4 border-ivory-300 rounded-r-xl" />
        <div className="absolute top-1/3 left-0 right-0 h-8 bg-electric/10 flex items-center justify-center">
          <div className="w-12 h-2 bg-electric/30 rounded-full" />
        </div>
        <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)]" />
        <div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </motion.div>
  );
}

function BottleVisual() {
  return (
    <motion.div
      className="absolute inset-[15%]"
      animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    >
      <div className="w-full h-full rounded-3xl bg-gradient-to-b from-white via-ivory-50 to-ivory-200 shadow-strong border border-border/40 relative overflow-hidden">
        <div className="absolute -top-2 left-1/4 right-1/4 h-4 bg-rich/80 rounded-t-lg" />
        <div className="absolute top-1/3 left-2 right-2 h-12 bg-white/80 rounded-lg border border-border/20 flex items-center justify-center">
          <div className="w-12 h-2 bg-electric/40 rounded-full" />
        </div>
        <div className="absolute top-0 left-1/4 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </motion.div>
  );
}

function KitVisual() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-0 left-[10%] w-[45%] z-0"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="aspect-[4/3] rounded-xl bg-ivory-200 shadow-soft opacity-60" />
      </motion.div>
      <motion.div
        className="absolute top-[15%] left-[20%] w-[40%] z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="aspect-square rounded-xl bg-white shadow-medium border border-border flex items-center justify-center">
          <div className="w-1/2 h-1/4 bg-electric/10 rounded-lg" />
        </div>
      </motion.div>
      <motion.div
        className="absolute top-[25%] right-[10%] w-[45%] z-20"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="aspect-square rounded-2xl bg-white shadow-strong border border-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-electric/12" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-electric/12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-electric/25 rounded-full border-2 border-white/50" />
        </div>
      </motion.div>
    </div>
  );
}

function IDCardVisual() {
  return (
    <motion.div
      className="absolute inset-[20%]"
      animate={{ y: [0, -6, 0], rotate: [0, 2.5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-charcoal/15" />
      <div className="w-full h-full rounded-xl bg-white shadow-strong border border-border/40 relative overflow-hidden">
        <div className="absolute top-3 left-3 w-12 h-14 bg-ivory-200 rounded-lg" />
        <div className="absolute top-4 right-3 left-20 space-y-1.5">
          <div className="w-full h-2 bg-rich/8 rounded" />
          <div className="w-2/3 h-2 bg-rich/5 rounded" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-electric/15" />
      </div>
    </motion.div>
  );
}

function NotebookVisual() {
  return (
    <motion.div
      className="absolute inset-[12%]"
      animate={{ y: [0, -12, 0], rotate: [0, -1.5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
    >
      <div className="w-full h-full rounded-r-xl rounded-l-md bg-gradient-to-r from-rich/8 via-white to-white shadow-strong border border-border/40 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-rich/15 rounded-l-md" />
        <div className="absolute top-4 right-4 w-16 h-3 bg-electric/15 rounded-full" />
        <div className="absolute bottom-4 left-6 right-4 space-y-2">
          <div className="w-full h-px bg-rich/4" />
          <div className="w-full h-px bg-rich/4" />
          <div className="w-2/3 h-px bg-rich/4" />
        </div>
      </div>
    </motion.div>
  );
}

function PackagingVisual() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-[10%] left-[5%] w-[55%] z-0"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="aspect-[4/3] rounded-xl bg-ivory-300 shadow-soft" />
      </motion.div>
      <motion.div
        className="absolute top-[20%] right-[5%] w-[50%] z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <div className="aspect-[3/4] rounded-xl bg-white shadow-medium border border-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-electric/12" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-electric/12" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[45%] z-20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="aspect-square rounded-xl bg-white shadow-strong border border-border" />
      </motion.div>
    </div>
  );
}

function GiftsVisual() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] z-20"
        animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-white to-ivory shadow-strong border border-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-electric/12" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-electric/12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-electric/25 rounded-full border-2 border-white/50" />
        </div>
      </motion.div>
      {[
        { x: '75%', y: '15%', delay: 0.5, size: '25%' },
        { x: '10%', y: '65%', delay: 1.2, size: '22%' },
        { x: '80%', y: '70%', delay: 2, size: '20%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: pos.x, top: pos.y, width: pos.size }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
        >
          <div className="aspect-square rounded-xl bg-white shadow-medium border border-border" />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── MAIN SECTION ─── */

export function ProductStorytelling() {
  const products = [
    {
      headline: 'The daily reminder.',
      description: 'Every morning, your brand becomes part of someone\'s ritual. A mug isn\'t just drinkware—it\'s a daily touchpoint that keeps your company top of mind.',
      tagline: 'Custom Coffee Mugs',
      layout: 'split-left' as const,
      visual: <MugVisual />,
      accentColor: '#E8D5C4',
    },
    {
      headline: 'Hydration that travels.',
      description: 'From gym bags to conference tables, a branded bottle goes wherever your people go. Premium materials, lasting impression.',
      tagline: 'Branded Bottles',
      layout: 'split-right' as const,
      visual: <BottleVisual />,
      accentColor: '#C4D8E8',
    },
    {
      headline: 'The first hello.',
      description: 'First impressions last. Our curated onboarding kits transform Day One into a brand experience your new hires will never forget.',
      tagline: 'Employee Welcome Kits',
      layout: 'centered' as const,
      visual: <KitVisual />,
      accentColor: '#D4C4E8',
    },
    {
      headline: 'Professional. Memorable. Premium.',
      description: 'More than access cards. They\'re badges of belonging. Designed to reflect your culture and worn with pride by every team member.',
      tagline: 'ID Cards & Lanyards',
      layout: 'full-bleed' as const,
      visual: <IDCardVisual />,
      accentColor: '#C4E8D4',
    },
    {
      headline: 'Ideas, bound in brand.',
      description: 'The best ideas deserve the best canvas. Our notebooks combine premium paper quality with impeccable branding for a writing experience that inspires.',
      tagline: 'Premium Notebooks',
      layout: 'split-left' as const,
      visual: <NotebookVisual />,
      accentColor: '#C4C8E8',
    },
    {
      headline: 'The unboxing moment.',
      description: 'Before they see the product, they see the packaging. We design boxes that create anticipation and make unboxing an experience worth sharing.',
      tagline: 'Custom Packaging',
      layout: 'split-right' as const,
      visual: <PackagingVisual />,
      accentColor: '#E8C4C4',
    },
    {
      headline: 'Gifts that build bridges.',
      description: 'The right gift at the right time strengthens relationships. From client appreciation to holiday giving, we craft gifts that feel personal and premium.',
      tagline: 'Corporate Gifts',
      layout: 'centered' as const,
      visual: <GiftsVisual />,
      accentColor: '#E8E0C4',
    },
  ];

  return (
    <section className="relative">
      <SectionIntro />

      {products.map((product, index) => (
        <ProductShowcase
          key={product.tagline}
          headline={product.headline}
          description={product.description}
          tagline={product.tagline}
          layout={product.layout}
          accentColor={product.accentColor}
          index={index}
        >
          {product.visual}
        </ProductShowcase>
      ))}

      {/* Section CTA */}
      <div className="section-sm bg-ivory-50 border-t border-border">
        <div className="container-brand">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            <h3 className="text-display-sm text-rich mb-5">
              Ready to make your brand tangible?
            </h3>
            <p className="text-body-lg text-charcoal mb-7">
              Let&apos;s discuss how we can bring your brand to life through 
              premium corporate merchandise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#inquiry" className="btn btn-primary btn-lg">
                Request a Quote
              </a>
              <a href="#case-studies" className="btn btn-secondary btn-lg">
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
