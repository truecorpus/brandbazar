'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Shield, Clock, MessageCircle, Award } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: 'Confidential Consultation',
    description: 'Your project details remain strictly private. We treat every inquiry with discretion.',
  },
  {
    icon: Clock,
    title: '24-Hour Response',
    description: 'Every consultation request receives a personalized response within one business day.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Available',
    description: 'Prefer chat? Reach us directly on WhatsApp for faster, informal discussions.',
  },
  {
    icon: Award,
    title: 'No Obligation',
    description: 'Our initial consultation is complimentary. Explore possibilities without commitment.',
  },
];

export function ContactTrust() {
  return (
    <section className="relative section-sm overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory-50/50 to-white" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center mb-12"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">WHY BRANDBAZAR</span>
          <h2 className="font-poppins text-h2 text-rich text-wrap-balance">
            A consultation experience designed around you
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
              className="p-6 lg:p-8 rounded-2xl bg-ivory/60 border border-border/20 hover:border-electric/10 hover:bg-white hover:shadow-soft transition-all duration-500 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-electric" />
              </div>
              <h3 className="font-poppins text-base font-semibold text-rich mb-2">{item.title}</h3>
              <p className="text-[13px] text-charcoal/50 leading-[1.6]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
