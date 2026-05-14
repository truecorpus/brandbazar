'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

export function FounderPhilosophy() {
  return (
    <section className="relative section overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/60 to-ivory" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-electric/[0.02] blur-[100px]" />

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — large portrait area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slower, ease: easing.cinematic }}
            className="lg:col-span-5"
          >
            {/* Portrait placeholder — editorial treatment */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-ivory-200 via-ivory-100 to-ivory-200">
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-rich/10 via-transparent to-transparent" />
              <div className="absolute inset-0 texture-dots opacity-[0.03]" />

              {/* Decorative initial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-electric/10 to-lavender/15 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-electric/40 font-poppins">B</span>
                  </div>
                  <span className="text-caption text-charcoal/20 tracking-widest">BRANDBAZAR</span>
                </div>
              </div>

              {/* Bottom quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 border border-white/40">
                  <p className="text-[15px] text-rich leading-relaxed italic">
                    &ldquo;The brands that win are the ones that care about details no one asked them to care about.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Founder name below portrait */}
            <div className="mt-6">
              <p className="font-poppins text-lg font-semibold text-rich">The BrandBazar Team</p>
              <p className="text-sm text-charcoal/50 mt-0.5">Founded in 2018</p>
            </div>
          </motion.div>

          {/* Right column — philosophy content */}
          <div className="lg:col-span-7 lg:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
              className="mb-10"
            >
              <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">FOUNDER PHILOSOPHY</span>
              <h2 className="font-poppins text-[32px] lg:text-[40px] font-bold text-rich leading-[1.12] tracking-[-0.02em] text-wrap-balance">
                Built on the belief that branding is an act of respect
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: 'The Detail Obsession',
                  text: 'We started BrandBazar because we were tired of seeing great companies undermine themselves with forgettable merchandise. A cheap pen. A flimsy tote. A mug that chips in a month. These are not small things — they are the physical evidence of how much a company values its relationships.',
                },
                {
                  title: 'Respect Through Objects',
                  text: 'Every item we create is designed with a single question: does this object communicate respect? Respect for the employee who receives it. Respect for the client who uses it. Respect for the brand it represents. When the answer is yes, we know we have done our job.',
                },
                {
                  title: 'The Long View',
                  text: 'We do not chase trends. We build identity systems that endure. A well-designed welcome kit should feel as relevant in year three as it does on day one. This is not conservatism — it is the confidence that comes from understanding what actually matters.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
                >
                  <h3 className="font-poppins text-lg font-semibold text-rich mb-2">{item.title}</h3>
                  <p className="text-[16px] text-charcoal/65 leading-[1.75]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
