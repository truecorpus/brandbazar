'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { easing, duration } from '@/lib/animations';
import { Gem, Layers, Eye, Heart } from 'lucide-react';

const pillars = [
  {
    icon: Gem,
    title: 'Material Truth',
    description: 'We select materials that feel honest in the hand. Weight, texture, temperature — every sensory detail is a brand signal. Cheap plastic tells a story we refuse to tell.',
    number: '01',
  },
  {
    icon: Layers,
    title: 'Layered Meaning',
    description: 'The best branded objects reveal themselves slowly. A hidden engraving inside a pen cap. A brand value printed on the inside of a box lid. These discoveries create lasting emotional bonds.',
    number: '02',
  },
  {
    icon: Eye,
    title: 'Invisible Standards',
    description: 'Our clients never see the rejected samples, the color-matching sessions, the prototype iterations. But they feel the difference. Excellence is the accumulation of invisible decisions.',
    number: '03',
  },
  {
    icon: Heart,
    title: 'Emotional Resonance',
    description: 'A welcome kit is not a transaction. It is an emotional event. We design for the moment of opening — the anticipation, the surprise, the quiet satisfaction of receiving something made with care.',
    number: '04',
  },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function CraftsmanshipSection() {
  return (
    <section className="relative section overflow-hidden bg-white">
      {/* Subtle ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-electric/[0.015] blur-[120px]" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[700px] mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">CRAFTSMANSHIP</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-6">
            Four pillars of how we think about making things
          </h2>
          <p className="text-[17px] text-charcoal/55 leading-[1.7]">
            Craftsmanship is not a buzzword for us. It is the disciplined practice of caring more than is strictly necessary.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20 lg:mb-28"
        >
          {[
            { value: 500, suffix: '+', label: 'Brands Served' },
            { value: 50, suffix: 'K+', label: 'Products Delivered' },
            { value: 98, suffix: '%', label: 'Client Retention' },
            { value: 12, suffix: '', label: 'Countries Reached' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="font-poppins text-[40px] lg:text-[52px] font-bold text-electric leading-none tracking-[-0.03em]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-charcoal/45 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
              className="group relative p-8 lg:p-10 rounded-2xl bg-ivory/60 border border-border/30 hover:border-electric/15 hover:bg-white hover:shadow-soft transition-all duration-500"
            >
              {/* Number */}
              <span className="absolute top-6 right-6 font-poppins text-[48px] font-bold text-charcoal/[0.04] leading-none">
                {pillar.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center mb-6 group-hover:from-electric/15 group-hover:to-lavender/15 transition-colors">
                <pillar.icon className="w-5 h-5 text-electric" />
              </div>

              <h3 className="font-poppins text-xl font-semibold text-rich mb-3">{pillar.title}</h3>
              <p className="text-[15px] text-charcoal/60 leading-[1.7]">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
