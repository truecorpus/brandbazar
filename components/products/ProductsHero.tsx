'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { easing, duration } from '@/lib/animations';

export function ProductsHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
      <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
      <div className="absolute bottom-[25%] left-[10%] w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />

      <div className="relative z-10 container-brand text-center py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
          className="text-caption text-charcoal/35 tracking-[0.2em] mb-6"
        >
          THE COLLECTION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
          className="font-poppins text-[40px] sm:text-[56px] lg:text-[72px] font-bold text-rich leading-[1.05] tracking-[-0.03em] text-wrap-balance max-w-[900px] mx-auto mb-6"
        >
          Products that <span className="text-electric">carry your brand</span> into daily life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.5 }}
          className="text-[17px] text-charcoal/50 leading-[1.7] max-w-[560px] mx-auto mb-10"
        >
          From the first sip of coffee to the notebook that holds your next big idea — every product is a canvas for your brand story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/quote" variant="primary">Request a Quote</Button>
          <span className="text-sm text-charcoal/35">7 product lines · 50+ variants · Ships nationwide</span>
        </motion.div>
      </div>
    </section>
  );
}
