'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { allProducts } from '@/lib/products/data';
import { easing, duration } from '@/lib/animations';
import { ProductVisualRouter } from './ProductVisualRouter';

export function ProductGrid() {
  return (
    <section className="relative section overflow-hidden">
      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[560px] mx-auto mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">THE COLLECTION</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Every product is a brand moment
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allProducts.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block p-6 lg:p-8 rounded-2xl bg-white border border-border/20 hover:border-electric/10 hover:shadow-soft transition-all duration-500 h-full"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-caption font-medium"
                    style={{ color: product.accentColor }}
                  >
                    {product.category}
                  </span>
                  <svg className="w-5 h-5 text-charcoal/20 group-hover:text-electric group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Visual */}
                <div className="mb-6 flex items-center justify-center py-8">
                  <div className="relative">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[60px]"
                      style={{ backgroundColor: `${product.accentColor}10` }}
                    />
                    <ProductVisualRouter
                      slug={product.slug}
                      accent={product.accentColor}
                      className="relative z-10 scale-110 group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-poppins text-xl font-semibold text-rich mb-2 group-hover:text-electric transition-colors">
                  {product.name}
                </h3>
                <p className="text-[14px] text-charcoal/45 leading-[1.6] mb-1">
                  {product.tagline}
                </p>
                {product.priceRange && (
                  <p className="text-sm text-charcoal/50 mb-4">
                    {product.priceRange}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/10">
                  <span className="text-xs text-charcoal/35">
                    Min. {product.minQty} units
                  </span>
                  <span className="w-1 h-1 rounded-full bg-charcoal/15" />
                  <span className="text-xs text-charcoal/35">
                    {product.leadTime}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
