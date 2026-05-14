'use client';

import { motion } from 'framer-motion';
import { ProductData } from '@/lib/products/types';
import { easing, duration } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProductUseCasesProps {
  product: ProductData;
}

export function ProductUseCases({ product }: ProductUseCasesProps) {
  return (
    <section className="relative section overflow-hidden bg-white">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-lavender/[0.03] blur-[120px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[600px] mx-auto mb-16"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">USE CASES</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Where they make an impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {product.useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-ivory/60 border border-border/20 hover:border-electric/10 hover:bg-white hover:shadow-soft transition-all duration-500"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${product.accentColor}10` }}
              >
                <span className="font-poppins text-xl font-bold" style={{ color: product.accentColor }}>
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-rich mb-3">{useCase.title}</h3>
              <p className="text-[15px] text-charcoal/50 leading-[1.7] mb-4">{useCase.description}</p>
              {useCase.solutionLink && (
                <Link
                  href={useCase.solutionLink}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                  style={{ color: product.accentColor }}
                >
                  Explore solution <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
