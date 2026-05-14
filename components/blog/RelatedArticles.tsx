'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';
import { ArrowUpRight, Clock, TrendingUp } from 'lucide-react';

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="section border-t border-border/40">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-electric" />
            <span className="text-caption text-charcoal/40 tracking-widest">CONTINUE READING</span>
          </div>
          <h2 className="font-poppins text-h2 text-rich mb-12 lg:mb-16 text-wrap-balance">
            More Insights
          </h2>

          {/* Editorial asymmetric grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* First article — large, spanning 7 columns */}
            {articles[0] && (
              <div className="lg:col-span-7">
                <RelatedCard article={articles[0]} index={0} size="large" />
              </div>
            )}

            {/* Second & Third — stacked, 5 columns */}
            {articles.length > 1 && (
              <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                {articles.slice(1, 3).map((article, i) => (
                  <RelatedCard key={article.slug} article={article} index={i + 1} size="compact" />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedCard({
  article,
  index,
  size,
}: {
  article: ArticleMeta;
  index: number;
  size: 'large' | 'compact';
}) {
  const isLarge = size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: duration.slow, ease: easing.cinematic }}
    >
      <Link href={`/blog/${article.slug}`} className="group block">
        <div
          className={`
            relative overflow-hidden rounded-2xl bg-surface border border-border/40
            transition-all duration-700 ease-cinematic
            hover:shadow-strong hover:border-border/60
            ${isLarge ? 'aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[16/10]'}
          `}
        >
          {/* Gradient cover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} transition-transform duration-700 ease-cinematic group-hover:scale-105`}
          />
          <div className="absolute inset-0 texture-dots opacity-[0.03]" />

          {/* Overlay for text readability on large card */}
          {isLarge && (
            <div className="absolute inset-0 bg-gradient-to-t from-rich/80 via-rich/30 to-transparent" />
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex px-3 py-1.5 rounded-full text-caption bg-white/90 backdrop-blur-sm"
              style={{ color: article.category.color }}
            >
              {article.category.name}
            </span>
          </div>

          {/* Arrow on hover */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-medium flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-rich" />
            </div>
          </div>

          {/* Content overlay for large card */}
          {isLarge && (
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <h3 className="font-poppins text-xl lg:text-2xl font-semibold text-white leading-tight text-wrap-balance mb-3">
                {article.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed line-clamp-2 max-w-lg">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-white/50">
                <span>{article.author.name}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content below for compact cards */}
        {!isLarge && (
          <div className="mt-4">
            <h3 className="font-poppins text-base lg:text-lg font-semibold text-rich leading-snug group-hover:text-electric transition-colors duration-300 text-wrap-balance">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-charcoal/50">
              <span>{article.author.name}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </span>
              {article.trending && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1 text-electric">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
