'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    description: 'We prioritize FSC-certified paper, recycled PET, organic cotton, and biodegradable alternatives. Every material choice reduces environmental impact without compromising quality.',
    stat: '80%+',
    statLabel: 'Sustainable options',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Every batch undergoes rigorous testing: colorfastness, durability, safety compliance, and print adhesion. We do not ship anything we would not use for our own brand.',
    stat: '12',
    statLabel: 'Quality checkpoints',
  },
  {
    icon: Sparkles,
    title: 'Premium Finishes',
    description: 'From soft-touch coatings to foil stamping, debossing, and laser engraving — our finishes elevate perceived value and create tactile brand memories.',
    stat: '40+',
    statLabel: 'Finish techniques',
  },
];

export function MaterialPhilosophy() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory/30 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric/[0.015] blur-[120px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[560px] mx-auto mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">OUR APPROACH</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Materials that matter
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
                className="group p-6 lg:p-8 rounded-2xl bg-white border border-border/20 hover:border-electric/10 hover:shadow-soft transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-electric" />
                  </div>
                  <div className="text-right">
                    <p className="font-poppins text-2xl font-bold text-rich">{pillar.stat}</p>
                    <p className="text-xs text-charcoal/40 uppercase tracking-wide">{pillar.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-poppins text-lg font-semibold text-rich mb-3">{pillar.title}</h3>
                <p className="text-[14px] text-charcoal/50 leading-[1.7]">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
