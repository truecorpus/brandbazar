'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { easing, duration } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductVisualRouter } from './ProductVisualRouter';

interface ProductRelatedProps {
  product: ProductData;
  related: ProductData[];
}

export function ProductRelated({ product, related }: ProductRelatedProps) {
  return (
    <section className="relative section overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">MORE TO EXPLORE</span>
            <h2 className="font-poppins text-[28px] lg:text-[36px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
              Related products
            </h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:gap-3 transition-all">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((relatedProduct, i) => (
            <motion.div
              key={relatedProduct.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
            >
              <Link
                href={`/products/${relatedProduct.slug}`}
                className="group block p-6 lg:p-8 rounded-2xl bg-ivory/60 border border-border/20 hover:border-electric/10 hover:bg-white hover:shadow-soft transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-caption font-medium"
                    style={{ color: relatedProduct.accentColor }}
                  >
                    {relatedProduct.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-charcoal/20 group-hover:text-electric group-hover:translate-x-1 transition-all" />
                </div>

                <div className="mb-6 flex items-center justify-center py-6">
                  <ProductVisualRouter
                    slug={relatedProduct.slug}
                    accent={relatedProduct.accentColor}
                    className="scale-90 group-hover:scale-100 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-poppins text-lg font-semibold text-rich mb-2 group-hover:text-electric transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-[13px] text-charcoal/45 leading-[1.6] line-clamp-2">
                  {relatedProduct.tagline}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
