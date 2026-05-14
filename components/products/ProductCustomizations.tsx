'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { easing, duration } from '@/lib/animations';
import { Check } from 'lucide-react';

interface ProductCustomizationsProps {
  product: ProductData;
}

export function ProductCustomizations({ product }: ProductCustomizationsProps) {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-electric/[0.015] blur-[150px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[600px] mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">CUSTOMIZATION</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Tailored to your exact vision
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Options list */}
          <div className="space-y-4">
            {product.customizationOptions.map((option, i) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border/20 hover:border-electric/10 hover:shadow-soft transition-all duration-300 group"
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${product.accentColor}12` }}
                >
                  <Check className="w-3.5 h-3.5" style={{ color: product.accentColor }} />
                </div>
                <div>
                  <h4 className="font-poppins text-[15px] font-semibold text-rich mb-1">{option.name}</h4>
                  <p className="text-sm text-charcoal/45 leading-[1.6]">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Visual summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="relative p-8 lg:p-10 rounded-2xl bg-white border border-border/20"
          >
            <h3 className="font-poppins text-xl font-semibold text-rich mb-6">Production Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/10">
                <span className="text-sm text-charcoal/40">Minimum Order</span>
                <span className="font-poppins text-sm font-medium text-rich">{product.minQty} units</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/10">
                <span className="text-sm text-charcoal/40">Lead Time</span>
                <span className="font-poppins text-sm font-medium text-rich">{product.leadTime}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/10">
                <span className="text-sm text-charcoal/40">Sample Time</span>
                <span className="font-poppins text-sm font-medium text-rich">5–7 working days</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/10">
                <span className="text-sm text-charcoal/40">Available Colors</span>
                <div className="flex gap-1.5">
                  {['#1a1a2e', '#e63946', '#2a9d8f', '#f4a261', '#e9c46a', '#264653', '#f8f1e5'].map((c) => (
                    <div key={c} className="w-4 h-4 rounded-full border border-border/30" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-charcoal/40">Print Methods</span>
                <span className="font-poppins text-sm font-medium text-rich">Screen, Digital, Emboss</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-ivory/60 text-center">
              <p className="text-sm text-charcoal/50 mb-3">Every order includes design mockups and a pre-production sample.</p>
              <a href="/quote" className="btn btn-primary btn-sm">Start Your Order</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
