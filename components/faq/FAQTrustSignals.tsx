'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Clock, ShieldCheck, MessageCircle, Truck, Award, Headphones } from 'lucide-react';

const signals = [
  {
    icon: Clock,
    value: '24h',
    label: 'Quote turnaround',
    description: 'Detailed quotes with mockups within one business day.',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Quality guarantee',
    description: 'Every order inspected. Defects replaced at no charge.',
  },
  {
    icon: MessageCircle,
    value: '48h',
    label: 'Mockup delivery',
    description: 'Photorealistic product previews after artwork submission.',
  },
  {
    icon: Truck,
    value: 'All India',
    label: 'Delivery coverage',
    description: 'Metro to remote locations with real-time tracking.',
  },
  {
    icon: Award,
    value: '3',
    label: 'Free revisions',
    description: 'Design rounds included. Most clients approve in two.',
  },
  {
    icon: Headphones,
    value: '1:1',
    label: 'Dedicated support',
    description: 'Enterprise clients get a personal account manager.',
  },
];

export function FAQTrustSignals() {
  return (
    <section className="relative section overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory/20 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric/[0.012] blur-[120px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[520px] mx-auto mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">WHY BRANDBAZAR</span>
          <h2 className="font-poppins text-[28px] lg:text-[36px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            The details that build trust
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
                className="group p-6 lg:p-7 rounded-2xl bg-ivory/40 border border-border/15 hover:bg-white hover:border-electric/10 hover:shadow-soft transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-electric/8 flex items-center justify-center group-hover:bg-electric/12 transition-colors">
                    <Icon className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-poppins text-2xl font-bold text-rich">{signal.value}</span>
                      <span className="text-[13px] text-charcoal/40 font-medium">{signal.label}</span>
                    </div>
                    <p className="text-[13px] text-charcoal/45 leading-[1.6]">{signal.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
