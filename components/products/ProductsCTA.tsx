'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

export function ProductsCTA() {
  return (
    <section className="relative section overflow-hidden bg-rich">
      <div className="absolute inset-0 texture-dots opacity-[0.03]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-electric/[0.06] blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.05] blur-[120px]" />

      <div className="container-brand relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
        >
          <h2 className="font-poppins text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-white leading-[1.1] tracking-[-0.02em] text-wrap-balance max-w-[700px] mx-auto mb-6">
            Ready to see your brand on these products?
          </h2>
          <p className="text-[17px] text-white/50 leading-[1.7] max-w-[480px] mx-auto mb-10">
            Get a custom quote with mockups in 48 hours. No minimum commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/quote" variant="primary">Get a Custom Quote</Button>
            <Button href="/contact" variant="ghost" className="text-white/70 hover:text-white border-white/10 hover:border-white/20">
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
