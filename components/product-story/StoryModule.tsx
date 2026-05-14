'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FloatingMockup, ProductPlaceholder } from './FloatingMockup';
import type { ProductStory } from './ProductData';

interface StoryModuleProps {
  story: ProductStory;
  index: number;
}

export function StoryModule({ story, index }: StoryModuleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const renderLayout = () => {
    switch (story.layout) {
      case 'split-left':
        return <SplitLeft story={story} isInView={isInView} y1={y1} y2={y2} />;
      case 'split-right':
        return <SplitRight story={story} isInView={isInView} y1={y1} y2={y2} />;
      case 'layered-center':
        return <LayeredCenter story={story} isInView={isInView} y1={y1} />;
      case 'cinematic-stack':
        return <CinematicStack story={story} isInView={isInView} scale={scale} />;
      case 'floating-constellation':
        return <FloatingConstellation story={story} isInView={isInView} y1={y1} />;
      case 'panoramic':
        return <Panoramic story={story} isInView={isInView} y1={y1} />;
      case 'editorial-grid':
        return <EditorialGrid story={story} isInView={isInView} y1={y1} y2={y2} />;
      default:
        return <SplitLeft story={story} isInView={isInView} y1={y1} y2={y2} />;
    }
  };

  return (
    <section
      ref={ref}
      className={cn(
        'relative min-h-screen py-24 lg:py-32 overflow-hidden',
        index % 2 === 0 ? 'bg-ivory' : 'bg-ivory-50'
      )}
    >
      {/* Subtle background accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? '30%' : '70%'} 50%, ${story.colorAccent}, transparent 60%)`,
        }}
      />
      
      {renderLayout()}
    </section>
  );
}

// ───────────────────────────────────────────
// LAYOUT VARIANTS
// ───────────────────────────────────────────

function SplitLeft({ 
  story, 
  isInView, 
  y1, 
  y2 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any; 
  y2: any;
}) {
  return (
    <div className="container-brand grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
      {/* Visual Side */}
      <motion.div 
        className="relative order-2 lg:order-1"
        style={{ y: y1 }}
      >
        <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
          {/* Primary Product */}
          <FloatingMockup
            amplitude={story.products[0]?.amplitude || 12}
            delay={story.products[0]?.delay || 0}
            rotate
            className="absolute inset-[10%] z-10"
          >
            <ProductPlaceholder
              className="w-full h-full shadow-strong"
              gradientFrom={story.colorAccent}
              gradientTo="#ffffff"
              label={story.products[0]?.name}
            />
          </FloatingMockup>

          {/* Secondary Product - Offset */}
          {story.products[1] && (
            <FloatingMockup
              amplitude={story.products[1].amplitude}
              delay={story.products[1].delay}
              className="absolute -bottom-4 -right-4 w-1/3 z-20"
            >
              <ProductPlaceholder
                className="w-full aspect-square shadow-medium"
                gradientFrom="#ffffff"
                gradientTo={story.colorAccent}
                label={story.products[1].name}
              />
            </FloatingMockup>
          )}

          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 border-2 border-border/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>

      {/* Text Side */}
      <div className="order-1 lg:order-2 lg:pl-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-caption text-charcoal mb-4 block"
        >
          {story.title}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="text-display-sm text-rich mb-6"
        >
          {story.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="text-body-lg text-charcoal mb-6 max-w-md"
        >
          {story.description}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="text-body-sm text-electric font-medium mb-8"
        >
          {story.benefit}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          <a 
            href={`/products/${story.id}`}
            className="inline-flex items-center gap-2 text-rich font-semibold group"
          >
            <span className="relative">
              Explore {story.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
            </span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function SplitRight({ 
  story, 
  isInView, 
  y1, 
  y2 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any; 
  y2: any;
}) {
  return (
    <div className="container-brand grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
      {/* Text Side */}
      <div className="lg:pr-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-caption text-charcoal mb-4 block"
        >
          {story.title}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="text-display-sm text-rich mb-6"
        >
          {story.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="text-body-lg text-charcoal mb-6 max-w-md"
        >
          {story.description}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="text-body-sm text-electric font-medium mb-8"
        >
          {story.benefit}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          <a 
            href={`/products/${story.id}`}
            className="inline-flex items-center gap-2 text-rich font-semibold group"
          >
            <span className="relative">
              Explore {story.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
            </span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Visual Side */}
      <motion.div 
        className="relative"
        style={{ y: y1 }}
      >
        <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto">
          {/* Background glow */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: story.colorAccent }}
          />

          {/* Primary Product */}
          <FloatingMockup
            amplitude={story.products[0]?.amplitude || 12}
            delay={story.products[0]?.delay || 0}
            rotate
            className="absolute inset-[10%] z-10"
          >
            <ProductPlaceholder
              className="w-full h-full shadow-strong"
              gradientFrom={story.colorAccent}
              gradientTo="#ffffff"
              label={story.products[0]?.name}
            />
          </FloatingMockup>

          {/* Secondary Product */}
          {story.products[1] && (
            <FloatingMockup
              amplitude={story.products[1].amplitude}
              delay={story.products[1].delay}
              className="absolute -bottom-4 -left-4 w-1/3 z-20"
            >
              <ProductPlaceholder
                className="w-full aspect-square shadow-medium"
                gradientFrom="#ffffff"
                gradientTo={story.colorAccent}
                label={story.products[1].name}
              />
            </FloatingMockup>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function LayeredCenter({ 
  story, 
  isInView, 
  y1 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any;
}) {
  return (
    <div className="container-brand flex flex-col items-center min-h-[80vh] justify-center">
      {/* Text Above */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-caption text-charcoal mb-4 block"
        >
          {story.title}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="text-display-sm text-rich mb-6"
        >
          {story.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="text-body-lg text-charcoal mb-4"
        >
          {story.description}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="text-body-sm text-electric font-medium"
        >
          {story.benefit}
        </motion.p>
      </div>

      {/* Layered Products */}
      <motion.div 
        className="relative w-full max-w-2xl aspect-[4/3]"
        style={{ y: y1 }}
      >
        {/* Back layer */}
        <FloatingMockup
          amplitude={16}
          delay={0.6}
          className="absolute top-0 left-1/4 w-1/2 z-0"
        >
          <ProductPlaceholder
            className="w-full aspect-[4/3] shadow-soft opacity-60"
            gradientFrom={story.colorAccent}
            gradientTo="#ffffff"
          />
        </FloatingMockup>

        {/* Middle layer */}
        <FloatingMockup
          amplitude={12}
          delay={0.3}
          className="absolute top-[15%] left-[15%] w-[45%] z-10"
        >
          <ProductPlaceholder
            className="w-full aspect-[4/3] shadow-medium"
            gradientFrom="#ffffff"
            gradientTo={story.colorAccent}
            label={story.products[1]?.name}
          />
        </FloatingMockup>

        {/* Front layer - Main Box */}
        <FloatingMockup
          amplitude={8}
          delay={0}
          className="absolute top-[25%] right-[10%] w-[50%] z-20"
        >
          <ProductPlaceholder
            className="w-full aspect-square shadow-strong"
            gradientFrom={story.colorAccent}
            gradientTo="#ffffff"
            label={story.products[0]?.name}
          />
        </FloatingMockup>
      </motion.div>
    </div>
  );
}

function CinematicStack({ 
  story, 
  isInView, 
  scale 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  scale: any;
}) {
  return (
    <div className="container-brand min-h-[80vh] flex flex-col justify-center">
      <motion.div style={{ scale }} className="relative">
        {/* Full width card */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-medium min-h-[60vh] flex flex-col lg:flex-row">
          {/* Visual side - takes full height on left */}
          <div className="lg:w-1/2 relative bg-ivory-50 p-8 lg:p-12 flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-sm aspect-[3/4]">
              {/* ID Card sliding in */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0, 0, 0.2, 1] }}
                className="absolute top-[10%] left-[10%] w-[60%] z-20"
              >
                <FloatingMockup amplitude={6} delay={0}>
                  <ProductPlaceholder
                    className="w-full aspect-[3/4] shadow-strong rounded-xl"
                    gradientFrom="#ffffff"
                    gradientTo={story.colorAccent}
                    label="ID Card"
                  />
                </FloatingMockup>
              </motion.div>

              {/* Lanyard */}
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0, 0, 0.2, 1] }}
                className="absolute top-0 right-[15%] w-[25%] z-10"
              >
                <div 
                  className="w-full h-32 rounded-full shadow-medium"
                  style={{ background: `linear-gradient(180deg, ${story.colorAccent}, #ffffff)` }}
                />
              </motion.div>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              className="text-caption text-charcoal mb-4 block"
            >
              {story.title}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
              className="text-display-sm text-rich mb-6"
            >
              {story.headline}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
              className="text-body-lg text-charcoal mb-6"
            >
              {story.description}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
              className="text-body-sm text-electric font-medium mb-8"
            >
              {story.benefit}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
            >
              <a 
                href={`/products/${story.id}`}
                className="inline-flex items-center gap-2 text-rich font-semibold group"
              >
                <span className="relative">
                  Explore {story.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
                </span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingConstellation({ 
  story, 
  isInView, 
  y1 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any;
}) {
  return (
    <div className="container-brand min-h-[80vh] flex flex-col items-center justify-center">
      {/* Text */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-caption text-charcoal mb-4 block"
        >
          {story.title}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="text-display-sm text-rich mb-6"
        >
          {story.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="text-body-lg text-charcoal mb-4"
        >
          {story.description}
        </motion.p>
      </div>

      {/* Constellation */}
      <motion.div 
        className="relative w-full max-w-3xl aspect-square"
        style={{ y: y1 }}
      >
        {/* Center piece */}
        <FloatingMockup
          amplitude={10}
          delay={0}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] z-20"
        >
          <ProductPlaceholder
            className="w-full aspect-square shadow-strong rounded-3xl"
            gradientFrom={story.colorAccent}
            gradientTo="#ffffff"
            label={story.products[0]?.name}
          />
        </FloatingMockup>

        {/* Orbiting piece 1 */}
        <FloatingMockup
          amplitude={14}
          delay={0.3}
          className="absolute top-[10%] right-[15%] w-[25%] z-10"
        >
          <ProductPlaceholder
            className="w-full aspect-square shadow-medium rounded-2xl"
            gradientFrom="#ffffff"
            gradientTo={story.colorAccent}
            label={story.products[1]?.name}
          />
        </FloatingMockup>

        {/* Orbiting piece 2 */}
        <FloatingMockup
          amplitude={12}
          delay={0.6}
          className="absolute bottom-[15%] left-[10%] w-[22%] z-10"
        >
          <ProductPlaceholder
            className="w-full aspect-square shadow-medium rounded-2xl"
            gradientFrom={story.colorAccent}
            gradientTo="#ffffff"
            label={story.products[2]?.name}
          />
        </FloatingMockup>

        {/* Small decorative orb */}
        <FloatingMockup
          amplitude={8}
          delay={0.9}
          className="absolute top-[30%] left-[5%] w-[12%] z-0"
        >
          <div 
            className="w-full aspect-square rounded-full shadow-soft"
            style={{ backgroundColor: story.colorAccent }}
          />
        </FloatingMockup>
      </motion.div>

      {/* Benefit below */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        className="text-body-sm text-electric font-medium mt-12 text-center"
      >
        {story.benefit}
      </motion.p>
    </div>
  );
}

function Panoramic({ 
  story, 
  isInView, 
  y1 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      {/* Full-bleed top visual */}
      <motion.div 
        className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden"
        style={{ y: y1 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${story.colorAccent}20, ${story.colorAccent}40)`,
          }}
        />
        
        {/* Floating notebooks */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FloatingMockup
            amplitude={12}
            delay={0}
            className="w-[30%] max-w-xs z-10"
          >
            <ProductPlaceholder
              className="w-full aspect-[3/4] shadow-strong rounded-xl"
              gradientFrom="#ffffff"
              gradientTo={story.colorAccent}
              label={story.products[0]?.name}
            />
          </FloatingMockup>

          {story.products[1] && (
            <FloatingMockup
              amplitude={10}
              delay={0.4}
              className="w-[22%] max-w-[240px] absolute right-[20%] top-[20%] z-20"
            >
              <ProductPlaceholder
                className="w-full aspect-[3/4] shadow-medium rounded-xl"
                gradientFrom={story.colorAccent}
                gradientTo="#ffffff"
                label={story.products[1].name}
              />
            </FloatingMockup>
          )}
        </div>
      </motion.div>

      {/* Text below */}
      <div className="container-brand py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            className="text-caption text-charcoal mb-4 block"
          >
            {story.title}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            className="text-display-sm text-rich mb-6"
          >
            {story.headline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
            className="text-body-lg text-charcoal mb-6"
          >
            {story.description}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
            className="text-body-sm text-electric font-medium mb-8"
          >
            {story.benefit}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
          >
            <a 
              href={`/products/${story.id}`}
              className="inline-flex items-center gap-2 text-rich font-semibold group"
            >
              <span className="relative">
                Explore {story.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
              </span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function EditorialGrid({ 
  story, 
  isInView, 
  y1, 
  y2 
}: { 
  story: ProductStory; 
  isInView: boolean; 
  y1: any;
  y2: any;
}) {
  return (
    <div className="container-brand min-h-[80vh] flex flex-col justify-center py-16">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="text-caption text-charcoal mb-4 block"
        >
          {story.title}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="text-display-sm text-rich mb-6"
        >
          {story.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="text-body-lg text-charcoal max-w-lg"
        >
          {story.description}
        </motion.p>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Large feature */}
        <motion.div 
          className="lg:col-span-2 lg:row-span-2"
          style={{ y: y1 }}
        >
          <FloatingMockup
            amplitude={8}
            delay={0}
            className="h-full"
          >
            <ProductPlaceholder
              className="w-full h-full min-h-[400px] lg:min-h-full shadow-strong rounded-2xl"
              gradientFrom={story.colorAccent}
              gradientTo="#ffffff"
              label={story.products[0]?.name}
            />
          </FloatingMockup>
        </motion.div>

        {/* Small top */}
        <motion.div style={{ y: y2 }}>
          <FloatingMockup
            amplitude={12}
            delay={0.3}
          >
            <ProductPlaceholder
              className="w-full aspect-square shadow-medium rounded-2xl"
              gradientFrom="#ffffff"
              gradientTo={story.colorAccent}
              label={story.products[1]?.name}
            />
          </FloatingMockup>
        </motion.div>

        {/* Small bottom with text */}
        <div className="flex flex-col justify-between">
          <FloatingMockup
            amplitude={10}
            delay={0.6}
          >
            <ProductPlaceholder
              className="w-full aspect-square shadow-medium rounded-2xl"
              gradientFrom={story.colorAccent}
              gradientTo="#ffffff"
              label={story.products[2]?.name}
            />
          </FloatingMockup>
        </div>
      </div>

      {/* Benefit */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: [0, 0, 0.2, 1] }}
        className="text-body-sm text-electric font-medium mt-12"
      >
        {story.benefit}
      </motion.p>
    </div>
  );
}
