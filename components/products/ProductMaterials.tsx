'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { easing, duration } from '@/lib/animations';

interface ProductMaterialsProps {
  product: ProductData;
}

export function ProductMaterials({ product }: ProductMaterialsProps) {
  return (
    <section className="relative section overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric/[0.015] blur-[120px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[600px] mx-auto mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">MATERIALS</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Premium materials, chosen with intention
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {product.materials.map((material, i) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
              className="group p-6 lg:p-8 rounded-2xl bg-ivory/60 border border-border/20 hover:border-electric/10 hover:bg-white hover:shadow-soft transition-all duration-500"
            >
              {/* Material swatch */}
              <div
                className="w-full h-24 rounded-xl mb-5 shadow-inner"
                style={{
                  background: `linear-gradient(135deg, ${material.color} 0%, ${material.color}dd 50%, ${material.color} 100%)`,
                  boxShadow: `inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 12px ${material.color}40`,
                }}
              />
              <h3 className="font-poppins text-base font-semibold text-rich mb-2">{material.name}</h3>
              <p className="text-[13px] text-charcoal/50 leading-[1.6]">{material.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
