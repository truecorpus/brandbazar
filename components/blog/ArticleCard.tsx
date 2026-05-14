'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';
import { Clock, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: ArticleMeta;
  index?: number;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
}

export function ArticleCard({ article, index = 0, variant = 'default' }: ArticleCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const isHorizontal = variant === 'horizontal';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: duration.slow,
        ease: easing.cinematic,
        delay: index * 0.08,
      }}
      className="group"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div
          className={`
            relative overflow-hidden bg-surface rounded-2xl border border-border/60
            transition-all duration-500 ease-cinematic
            hover:shadow-strong hover:border-border hover:-translate-y-1
            ${isFeatured ? 'aspect-[16/10]' : isCompact ? 'aspect-[4/3]' : isHorizontal ? 'flex flex-col sm:flex-row' : 'aspect-[4/3]'}
          `}
        >
          {/* Image / Gradient Area */}
          <div
            className={`
              relative overflow-hidden
              ${isHorizontal ? 'aspect-[4/3] sm:aspect-auto sm:w-[45%] sm:min-h-[280px]' : 'absolute inset-0'}
            `}
          >
            {/* Gradient Background */}
            <div
              className={`
                absolute inset-0 bg-gradient-to-br ${article.coverGradient}
                transition-transform duration-700 ease-cinematic
                group-hover:scale-105
              `}
            />
            
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] texture-dots" />
            
            {/* Category Badge */}
            <div className={`
              absolute top-4 left-4 z-10
              ${isHorizontal ? 'top-3 left-3' : ''}
            `}>
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-caption font-medium bg-white/90 backdrop-blur-sm shadow-soft"
                style={{ color: article.category.color }}
              >
                {article.category.name}
              </span>
            </div>

            {/* Arrow indicator on hover */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-medium flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-rich" />
              </div>
            </div>

            {/* Gradient overlay for text readability */}
            {!isHorizontal && (
              <div className="absolute inset-0 bg-gradient-to-t from-rich/70 via-rich/20 to-transparent" />
            )}

            {/* Featured content overlay */}
            {isFeatured && (
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-caption text-white/80 tracking-wider">FEATURED</span>
                  <span className="w-8 h-px bg-white/30" />
                </div>
                <h3 className="font-poppins text-xl lg:text-2xl font-semibold text-white leading-tight text-wrap-balance mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-2 max-w-xl">
                  {article.excerpt}
                </p>
              </div>
            )}
          </div>

          {/* Content for non-featured variants */}
          {!isFeatured && (
            <div className={`p-5 ${isHorizontal ? 'sm:p-6 sm:flex-1 flex flex-col justify-center' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-caption" style={{ color: article.category.color }}>
                  {article.category.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-caption text-charcoal/60">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h3 className="font-poppins text-lg font-semibold text-rich leading-snug text-wrap-balance mb-2 group-hover:text-electric transition-colors duration-300">
                {article.title}
              </h3>

              {!isCompact && (
                <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-electric/20 to-lavender/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-electric">
                      {article.author.avatar}
                    </span>
                  </div>
                  <span className="text-xs text-charcoal/60">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1 text-charcoal/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{article.readTime} min</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
