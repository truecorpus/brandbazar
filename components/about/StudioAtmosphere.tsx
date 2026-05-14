'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

const atmosphereItems = [
  {
    label: 'Design Studio',
    description: 'Where concepts become physical',
    gradient: 'from-rose-100/40 via-amber-50/30 to-ivory',
  },
  {
    label: 'Sampling Lab',
    description: 'Prototypes and perfectionism',
    gradient: 'from-blue-100/40 via-indigo-50/30 to-ivory',
  },
  {
    label: 'Material Library',
    description: 'Textures, weights, finishes',
    gradient: 'from-emerald-100/40 via-teal-50/30 to-ivory',
  },
  {
    label: 'Client Gallery',
    description: 'Work in context, work in use',
    gradient: 'from-violet-100/40 via-lavender-50/30 to-ivory',
  },
];

export function StudioAtmosphere() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/50 to-ivory" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-electric/[0.015] blur-[150px]" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[640px] mx-auto mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">OUR STUDIO</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-6">
            A space designed for thoughtful creation
          </h2>
          <p className="text-[17px] text-charcoal/55 leading-[1.7]">
            Our studio is not a factory. It is a thinking space where materials, ideas, and intentions converge into objects that carry meaning.
          </p>
        </motion.div>

        {/* Atmosphere grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {atmosphereItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-ivory-200 to-ivory-100 border border-border/30 hover:border-electric/15 transition-all duration-500">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                <div className="absolute inset-0 texture-dots opacity-[0.03]" />

                {/* Decorative circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-charcoal/5 group-hover:border-electric/10 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/[0.03] group-hover:bg-electric/5 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/40">
                    <p className="font-poppins text-sm font-semibold text-rich">{item.label}</p>
                    <p className="text-xs text-charcoal/45 mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="mt-16 lg:mt-24 text-center max-w-[600px] mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 rounded-full bg-electric/30" />
            <div className="w-12 h-px bg-border" />
          </div>
          <p className="text-[18px] lg:text-[20px] text-charcoal/50 leading-[1.7] italic font-poppins">
            &ldquo;The studio is where intention meets material. Every surface, every tool, every sample is a reminder that branding is fundamentally about making things that matter.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
