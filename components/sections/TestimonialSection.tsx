'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

/* ─── DATA ─── */

const testimonials = [
  {
    id: '1',
    quote: "BrandBazar didn't just print our logo on mugs—they translated our entire brand philosophy into physical objects our team uses every day.",
    author: 'Priya Sharma',
    role: 'Head of People Operations',
    company: 'TechStart Inc.',
    industry: 'Technology',
    metric: '200+ employee kits',
    featured: true,
  },
  {
    id: '2',
    quote: "The quality exceeded our expectations. Our clients actually comment on the merchandise we send them now—that never happened before.",
    author: 'Arjun Mehta',
    role: 'Marketing Director',
    company: 'Vertex Consulting',
    industry: 'Consulting',
    metric: '500+ client gifts',
  },
  {
    id: '3',
    quote: "From concept to delivery, the process was seamless. They handled everything—from design to bulk production—without us lifting a finger.",
    author: 'Kavita Reddy',
    role: 'Event Manager',
    company: 'Summit Conference',
    industry: 'Events',
    metric: '3,000+ event kits',
  },
  {
    id: '4',
    quote: "Our students actually keep their welcome kits. That says everything about the quality and thought that goes into their work.",
    author: 'Dr. Rahul Nair',
    role: 'Dean of Student Affairs',
    company: 'EduLearn Academy',
    industry: 'Education',
    metric: '1,200+ student kits',
  },
  {
    id: '5',
    quote: "We ordered 10,000 units for a nationwide campaign. Every single piece was consistent, on-time, and flawlessly branded.",
    author: 'Sonia Patel',
    role: 'Brand Manager',
    company: 'NutriLife Foods',
    industry: 'Consumer Goods',
    metric: '10,000+ units',
    featured: true,
  },
  {
    id: '6',
    quote: "The mockup previews alone saved us weeks of back-and-forth. Seeing our brand on products before production was a game-changer.",
    author: 'Vikram Joshi',
    role: 'Creative Director',
    company: 'Studio Nine',
    industry: 'Design Agency',
  },
];

/* ─── FEATURED TESTIMONIAL ─── */

function FeaturedTestimonial({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
      className="relative"
    >
      <div className="absolute -top-10 left-0 text-[8rem] lg:text-[10rem] leading-none text-electric/[0.04] font-serif select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative bg-white/4 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-14 border border-white/8">
        <blockquote className="text-h2 lg:text-display-sm text-white font-poppins font-medium leading-snug mb-8 lg:mb-10">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white/8 flex items-center justify-center border border-white/15">
              <span className="text-base font-poppins font-semibold text-white">
                {testimonial.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <span className="text-body font-semibold text-white block">{testimonial.author}</span>
              <span className="text-body-sm text-white/45">
                {testimonial.role}, {testimonial.company}
              </span>
            </div>
          </div>

          {testimonial.metric && (
            <div className="px-4 py-2.5 rounded-xl bg-white/8 border border-white/15">
              <span className="text-body-sm text-electric font-medium">{testimonial.metric}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FLOATING CARD ─── */

function FloatingCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white/4 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: duration.slow,
        delay: index * 0.08,
        ease: easing.cinematic,
      }}
    >
      <svg className="w-7 h-7 text-electric/25 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <p className="text-body text-white/75 mb-5 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-body-sm font-semibold text-white block">{testimonial.author}</span>
          <span className="text-caption text-white/35">
            {testimonial.role}, {testimonial.company}
          </span>
        </div>
        {testimonial.metric && (
          <span className="text-caption text-electric bg-electric/15 px-3 py-1 rounded-full">
            {testimonial.metric}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ─── */

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featured = testimonials.filter(t => t.featured);
  const regular = testimonials.filter(t => !t.featured);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(advance, 7000);
    return () => clearInterval(interval);
  }, [isPaused, advance]);

  return (
    <section ref={sectionRef} className="relative bg-rich text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-electric/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-lavender/4 blur-[100px] pointer-events-none" />

      <div className="relative section">
        <div className="container-brand">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            <span className="text-caption text-white/35 mb-5 block">Client Stories</span>
            <h2 className="text-display-md text-white mb-6 lg:mb-8">
              Trusted by teams that expect <span className="text-electric">excellence.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="relative pb-16 lg:pb-20">
        <div className="container-brand">
          <div className="max-w-5xl mx-auto">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <FeaturedTestimonial testimonial={featured[activeIndex]} />
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2.5 mt-8">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-electric w-8' : 'bg-white/15 w-1.5 hover:bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative pb-24 lg:pb-32">
        <div className="container-brand">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {regular.map((testimonial, index) => (
              <FloatingCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-14 border-t border-white/8">
        <div className="container-brand">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.normal, ease: easing.cinematic }}
          >
            <p className="text-body-lg text-white/50">
              Join <span className="text-white font-semibold">500+ companies</span> that trust BrandBazar
            </p>
            <p className="text-body-sm text-white/30 mt-1.5">
              From startups to Fortune 500s, we deliver premium branding at every scale.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
