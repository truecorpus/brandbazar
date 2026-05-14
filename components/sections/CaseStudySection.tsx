'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easing, duration } from '@/lib/animations';

/* ─── CASE STUDY DATA ─── */

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  products: string[];
  impact: string;
  metric: { value: string; label: string };
  accentColor: string;
  layout: 'fullscreen' | 'split' | 'editorial' | 'panoramic';
}

const caseStudies: CaseStudy[] = [
  {
    id: 'techstart',
    client: 'TechStart Inc.',
    industry: 'Technology / SaaS',
    headline: 'A welcome that sets the standard.',
    description: 'When TechStart tripled their headcount in six months, they needed an onboarding experience that matched their culture. We designed a complete joining kit that turned first days into memorable brand moments.',
    products: ['Employee Joining Kit', 'Branded Notebook', 'Custom Mug', 'ID Card & Lanyard'],
    impact: 'Employee satisfaction with onboarding increased from 72% to 94%.',
    metric: { value: '200+', label: 'Kits Delivered' },
    accentColor: '#4D7CFE',
    layout: 'fullscreen',
  },
  {
    id: 'brewcraft',
    client: 'BrewCraft Coffee',
    industry: 'Food & Beverage',
    headline: 'From local favorite to recognizable brand.',
    description: 'BrewCraft wanted their merchandise to feel as crafted as their coffee. We developed a line of branded drinkware and packaging that told their origin story in every detail.',
    products: ['Ceramic Mugs', 'Steel Bottles', 'Custom Packaging', 'Loyalty Cards'],
    impact: 'Merchandise sales became 18% of total revenue within the first quarter.',
    metric: { value: '3,500', label: 'Units Sold' },
    accentColor: '#C9B8FF',
    layout: 'split',
  },
  {
    id: 'edulearn',
    client: 'EduLearn Academy',
    industry: 'Education',
    headline: 'Pride in every uniform.',
    description: 'EduLearn needed student kits that inspired pride and belonging. We created a comprehensive identity system—from welcome packages to event materials—that students actually wanted to keep.',
    products: ['Student Welcome Kit', 'Event Merchandise', 'ID Cards', 'Notebooks'],
    impact: 'Student engagement with school events increased by 40%.',
    metric: { value: '1,200', label: 'Students Reached' },
    accentColor: '#E8D5C4',
    layout: 'editorial',
  },
  {
    id: 'summit',
    client: 'Summit Conference',
    industry: 'Events / Corporate',
    headline: 'An event brand that travels.',
    description: 'Summit needed event merchandise that attendees would use long after the conference ended. We designed a cohesive merchandise ecosystem that turned every touchpoint into a brand impression.',
    products: ['Event Tote Bags', 'Branded Bottles', 'Lanyards', 'Notebook Sets'],
    impact: 'Post-event brand recall reached 87% among attendees.',
    metric: { value: '3,000+', label: 'Attendees' },
    accentColor: '#D4C4E8',
    layout: 'panoramic',
  },
];

/* ─── MOCKUP SCENE COMPONENTS ─── */

function KitScene({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
      <div className="relative w-56 h-56 lg:w-64 lg:h-64">
        <motion.div
          className="absolute top-4 left-4 w-36 h-48 bg-white rounded-r-lg rounded-l-sm shadow-medium border border-border/25"
          animate={{ y: [0, -5, 0], rotate: [-2, -0.5, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl shadow-strong border border-border/40 z-10 overflow-hidden"
          style={{ background: `linear-gradient(135deg, white, ${accentColor}12)` }}
          animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-full" style={{ backgroundColor: `${accentColor}18` }} />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5" style={{ backgroundColor: `${accentColor}18` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-white/50" style={{ backgroundColor: `${accentColor}35` }} />
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4 w-20 h-28 bg-white rounded-2xl shadow-medium border border-border/25 z-20"
          animate={{ y: [0, -6, 0], rotate: [2, 4, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="absolute top-1/3 left-0 right-0 h-6 flex items-center justify-center">
            <div className="w-10 h-2 rounded-full" style={{ backgroundColor: `${accentColor}25` }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BottleScene({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
      <div className="relative w-44 h-60 lg:w-48 lg:h-64">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-3xl shadow-strong border border-border/30 overflow-hidden"
            style={{
              width: `${100 - i * 15}%`,
              height: `${100 - i * 10}%`,
              left: `${i * 20}%`,
              top: `${i * 8}%`,
              background: `linear-gradient(180deg, white, ${accentColor}${12 - i * 4})`,
              zIndex: 3 - i,
            }}
            animate={{ y: [0, -6 + i * 1.5, 0], rotate: [i * 1.5 - 1.5, i * 1.5, i * 1.5 - 1.5] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            <div className="absolute -top-2 left-1/4 right-1/4 h-3 bg-rich/60 rounded-t-lg" />
            <div className="absolute top-1/3 left-3 right-3 h-10 bg-white/70 rounded-lg border border-border/15 flex items-center justify-center">
              <div className="w-12 h-2 rounded-full" style={{ backgroundColor: `${accentColor}35` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EducationScene({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
      <div className="relative w-64 h-52 lg:w-72 lg:h-56">
        {[
          { x: '10%', y: '10%', rotate: -6, delay: 0 },
          { x: '60%', y: '5%', rotate: 4, delay: 0.5 },
          { x: '30%', y: '50%', rotate: -2, delay: 1 },
          { x: '65%', y: '45%', rotate: 10, delay: 1.5 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-24 lg:w-20 lg:h-28 bg-white rounded-xl shadow-medium border border-border/25"
            style={{ left: pos.x, top: pos.y }}
            animate={{ y: [0, -4, 0], rotate: [pos.rotate, pos.rotate + 1.5, pos.rotate] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
          >
            <div className="absolute top-2 left-2 w-5 h-7 lg:w-6 lg:h-8 bg-ivory-200 rounded" />
            <div className="absolute top-3 right-2 left-8 lg:left-10 space-y-1">
              <div className="w-full h-1.5 bg-rich/8 rounded" />
              <div className="w-2/3 h-1.5 bg-rich/4 rounded" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-3 rounded-b-xl" style={{ backgroundColor: `${accentColor}25` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EventScene({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
      <div className="relative w-56 h-56 lg:w-64 lg:h-64">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-44 lg:w-40 lg:h-48 bg-white rounded-lg shadow-strong border border-border/30 z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 border-4 border-ivory-300 rounded-t-lg -mt-4" />
          <div className="absolute top-1/3 left-4 right-4 h-8 rounded flex items-center justify-center" style={{ backgroundColor: `${accentColor}12` }}>
            <div className="w-16 h-2 rounded-full" style={{ backgroundColor: `${accentColor}35` }} />
          </div>
        </motion.div>
        {[
          { x: '-8%', y: '10%', w: 14, h: 18 },
          { x: '78%', y: '18%', w: 12, h: 26 },
          { x: '5%', y: '58%', w: 16, h: 12 },
          { x: '72%', y: '62%', w: 14, h: 16 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-lg shadow-medium border border-border/25"
            style={{ left: item.x, top: item.y, width: item.w * 4, height: item.h * 4 }}
            animate={{ y: [0, -5, 0], rotate: [i * 2.5, i * 2.5 + 1.5, i * 2.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CASE STUDY CARD ─── */

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 0.97]);

  const scenes: Record<string, React.ReactNode> = {
    techstart: <KitScene accentColor={study.accentColor} />,
    brewcraft: <BottleScene accentColor={study.accentColor} />,
    edulearn: <EducationScene accentColor={study.accentColor} />,
    summit: <EventScene accentColor={study.accentColor} />,
  };

  return (
    <div
      ref={ref}
      id="case-studies"
      className={cn(
        'relative py-16 lg:py-24',
        index % 2 === 0 ? 'bg-ivory' : 'bg-ivory-50'
      )}
    >
      <div className="container-brand">
        {study.layout === 'fullscreen' && (
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-strong border border-border">
            <motion.div
              className="relative aspect-[16/10] lg:aspect-[21/9]"
              style={{ scale: imageScale }}
            >
              <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${study.accentColor}06, ${study.accentColor}12)` }}>
                {scenes[study.id]}
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-rich/80 via-rich/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, delay: 0.15, ease: easing.cinematic }}
              >
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
                  style={{ backgroundColor: study.accentColor }}
                >
                  {study.industry}
                </span>
                <h3 className="text-display-sm text-white mb-3 max-w-xl">{study.headline}</h3>
                <p className="text-body-lg text-white/75 max-w-lg mb-5">{study.description}</p>

                <div className="flex flex-wrap items-center gap-5">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
                    <span className="text-h3 text-white font-poppins font-bold block">{study.metric.value}</span>
                    <span className="text-body-sm text-white/55">{study.metric.label}</span>
                  </div>
                  <span className="text-white/70 font-medium text-sm">{study.impact}</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {study.layout === 'split' && (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div style={{ y }} className="relative order-2 lg:order-1">
              <div
                className="relative aspect-square max-w-lg mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-strong border border-border"
                style={{ background: `linear-gradient(135deg, ${study.accentColor}08, ${study.accentColor}16)` }}
              >
                {scenes[study.id]}
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, ease: easing.cinematic }}
              >
                <span className="text-caption text-charcoal mb-3 block">{study.client}</span>
                <h3 className="text-display-sm text-rich mb-5">{study.headline}</h3>
                <p className="text-body-lg text-charcoal mb-6 max-w-md">{study.description}</p>

                <div className="mb-6 p-4 lg:p-5 rounded-xl bg-white border border-border">
                  <span className="text-caption text-charcoal mb-2 block">Impact</span>
                  <p className="text-body text-rich font-medium">{study.impact}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-h2 text-rich font-poppins font-bold block">{study.metric.value}</span>
                    <span className="text-caption text-charcoal">{study.metric.label}</span>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <span className="text-body-sm text-charcoal/60 max-w-[200px]">{study.products.join(', ')}</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {study.layout === 'editorial' && (
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12 lg:mb-14"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
            >
              <span className="text-caption text-charcoal mb-3 block">{study.client}</span>
              <h3 className="text-display-sm text-rich mb-5">{study.headline}</h3>
              <p className="text-body-lg text-charcoal max-w-2xl mx-auto">{study.description}</p>
            </motion.div>

            <motion.div
              className="relative aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden shadow-strong border border-border"
              style={{ y, background: `linear-gradient(135deg, ${study.accentColor}08, ${study.accentColor}16)` }}
            >
              {scenes[study.id]}
            </motion.div>

            <motion.div
              className="mt-10 lg:mt-12 flex flex-wrap items-center justify-center gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: 0.2, ease: easing.cinematic }}
            >
              <div className="text-center px-6 py-4 lg:px-8 lg:py-4 bg-white rounded-xl border border-border">
                <span className="text-h2 text-rich font-poppins font-bold block">{study.metric.value}</span>
                <span className="text-caption text-charcoal">{study.metric.label}</span>
              </div>
              <div className="max-w-sm text-center lg:text-left">
                <span className="text-body text-rich font-medium block">{study.impact}</span>
              </div>
            </motion.div>
          </div>
        )}

        {study.layout === 'panoramic' && (
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-white shadow-strong border border-border">
            <div className="grid lg:grid-cols-5 min-h-[50vh] lg:min-h-0">
              <motion.div
                className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto"
                style={{ background: `linear-gradient(135deg, ${study.accentColor}06, ${study.accentColor}12)` }}
              >
                {scenes[study.id]}
              </motion.div>

              <div className="lg:col-span-2 p-6 lg:p-10 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: duration.slow, delay: 0.15, ease: easing.cinematic }}
                >
                  <span className="text-caption text-charcoal mb-3 block">{study.industry}</span>
                  <h3 className="text-h2 text-rich mb-3">{study.headline}</h3>
                  <p className="text-body text-charcoal mb-5">{study.description}</p>

                  <div className="p-4 rounded-xl bg-ivory-50 border border-border mb-5">
                    <span className="text-h3 text-rich font-poppins font-bold block">{study.metric.value}</span>
                    <span className="text-caption text-charcoal">{study.metric.label}</span>
                  </div>

                  <p className="text-body-sm text-charcoal/60">{study.impact}</p>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN SECTION ─── */

export function CaseStudySection() {
  const introRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(introRef, { once: true, amount: 0.3 });

  return (
    <section className="relative">
      <div ref={introRef} className="section bg-ivory">
        <div className="container-brand">
          <div className="max-w-4xl">
            <motion.span
              className="text-caption text-charcoal mb-5 block"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, ease: easing.cinematic }}
            >
              Featured Work
            </motion.span>

            <motion.h2
              className="text-display-md text-rich mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
            >
              Brand Experiences That <span className="text-electric">Leave An Impression.</span>
            </motion.h2>

            <motion.p
              className="text-body-lg text-charcoal max-w-2xl"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.slow, delay: 0.16, ease: easing.cinematic }}
            >
              Real projects, real transformations. See how we elevate brands 
              into tangible experiences for companies across industries.
            </motion.p>
          </div>
        </div>
      </div>

      {caseStudies.map((study, index) => (
        <CaseStudyCard key={study.id} study={study} index={index} />
      ))}

      <div className="section-sm bg-ivory-50 text-center border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease: easing.cinematic }}
        >
          <a href="#inquiry" className="btn btn-secondary btn-lg inline-flex items-center gap-3">
            <span>Start Your Project</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
