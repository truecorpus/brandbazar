'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Search, PenTool, FlaskConical, Rocket, Handshake } from 'lucide-react';

const phases = [
  {
    icon: Search,
    name: 'Discovery',
    description: 'We begin by understanding your brand\'s soul. Your values, your audience, your ambitions. We listen more than we speak in this phase — because the best work comes from genuine understanding, not assumption.',
    detail: '2–3 weeks',
  },
  {
    icon: PenTool,
    name: 'Design',
    description: 'Every concept is explored, refined, and stress-tested. We do not present options for the sake of options. We present the one direction that feels inevitable — then we make it better.',
    detail: '3–4 weeks',
  },
  {
    icon: FlaskConical,
    name: 'Prototype',
    description: 'Digital mocks become physical objects. We sample, test, and iterate until the weight, texture, and finish feel exactly right. This is where good ideas become great objects.',
    detail: '2–3 weeks',
  },
  {
    icon: Rocket,
    name: 'Deliver',
    description: 'Precision packaging. Quality checkpoints at every stage. Timelines we actually keep. The delivery is the final impression — and we treat it with the seriousness it deserves.',
    detail: '1–2 weeks',
  },
  {
    icon: Handshake,
    name: 'Evolve',
    description: 'Brands grow. Needs change. We stay connected, offering seasonal refreshes, new product lines, and strategic counsel. A brand relationship, like a brand itself, is never truly finished.',
    detail: 'Ongoing',
  },
];

export function ProcessPhilosophy() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-lavender/[0.03] blur-[100px]" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[600px] mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">OUR PROCESS</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-6">
            How we work is how we think
          </h2>
          <p className="text-[17px] text-charcoal/55 leading-[1.7]">
            Our process is not a linear conveyor belt. It is a conversation — one that gets richer with every exchange.
          </p>
        </motion.div>

        {/* Process phases — editorial vertical layout */}
        <div className="max-w-[800px]">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
              className="relative pl-12 lg:pl-16 pb-14 lg:pb-18 last:pb-0"
            >
              {/* Timeline line */}
              {i < phases.length - 1 && (
                <div className="absolute left-[22px] lg:left-[26px] top-14 bottom-0 w-px bg-border/50" />
              )}

              {/* Icon node */}
              <div className="absolute left-0 top-0 w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-white border border-border/40 flex items-center justify-center shadow-soft">
                <phase.icon className="w-5 h-5 text-electric" />
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-poppins text-xl lg:text-2xl font-semibold text-rich">
                    {phase.name}
                  </h3>
                  <span className="text-xs text-charcoal/35 font-medium px-2.5 py-1 rounded-full bg-ivory-100">
                    {phase.detail}
                  </span>
                </div>
                <p className="text-[16px] text-charcoal/60 leading-[1.75] max-w-[600px]">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
