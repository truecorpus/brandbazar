'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { Button } from '@/components/ui/Button';
import { easing, duration } from '@/lib/animations';
import { gtagEvent, EVENT_PRODUCT_QUOTE_CLICK } from '@/lib/analytics';
import { ProductVisualRouter } from './ProductVisualRouter';

interface ProductHeroProps {
  product: ProductData;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br ${product.heroGradient}`}>
      <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />

      <div className="relative z-10 container-brand w-full py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
              className="mb-6"
            >
              <span
                className="inline-flex px-4 py-1.5 rounded-full text-caption font-medium bg-white/80 backdrop-blur-sm"
                style={{ color: product.accentColor }}
              >
                {product.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
              className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-rich leading-[1.05] tracking-[-0.03em] text-wrap-balance mb-4"
            >
              {product.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.45 }}
              className="font-poppins text-xl lg:text-2xl text-charcoal/50 mb-6 text-wrap-balance"
            >
              {product.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.55 }}
              className="text-base text-charcoal/55 leading-[1.7] mb-8 max-w-[480px]"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href={`/quote?product=${product.slug}`}
                variant="primary"
                onClick={() => gtagEvent(EVENT_PRODUCT_QUOTE_CLICK, { product: product.slug, location: 'product_hero' })}
              >
                Request a Quote
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-charcoal/40">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: product.accentColor }} />
                From {product.priceRange} · Min. {product.minQty} units · {product.leadTime}
              </span>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.4 }}
            className="flex items-center justify-center py-12"
          >
            <div className="relative">
              {/* Ambient glow behind product */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px]"
                style={{ backgroundColor: `${product.accentColor}15` }}
              />
              <ProductVisualRouter
                slug={product.slug}
                accent={product.accentColor}
                className="relative z-10 scale-150 lg:scale-[1.75]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
