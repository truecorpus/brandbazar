'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { easing, duration } from '@/lib/animations';
import { Zap, Eye, Heart, Shield } from 'lucide-react';

const featureIcons = [Zap, Eye, Heart, Shield];

interface ProductFeaturesProps {
  product: ProductData;
}

export function ProductFeatures({ product }: ProductFeaturesProps) {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[600px] mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">WHY IT WORKS</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Features that create lasting impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {product.features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
                className="flex gap-5 p-6 lg:p-8 bg-white rounded-2xl border border-border/20 hover:border-electric/10 hover:shadow-soft transition-all duration-500 group"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: `${product.accentColor}10` }}
                >
                  <Icon className="w-5 h-5" style={{ color: product.accentColor }} />
                </div>
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-rich mb-2 group-hover:text-electric transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-charcoal/55 leading-[1.7]">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
