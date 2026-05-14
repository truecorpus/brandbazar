'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';

interface FeaturedHeroProps {
  article: ArticleMeta;
}

export function FeaturedHero({ article }: FeaturedHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient}`} />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 texture-dots opacity-[0.04]" />
      
      {/* Floating accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-electric/5 blur-3xl animate-breathe" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-lavender/8 blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container-brand w-full pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl">
          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rich text-white text-caption">
              <TrendingUp className="w-3.5 h-3.5" />
              Featured Story
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-caption font-medium bg-white/80 backdrop-blur-sm"
              style={{ color: article.category.color }}
            >
              {article.category.name}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.3 }}
            className="font-poppins text-display-md lg:text-display text-rich mb-6 text-wrap-balance"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.45 }}
            className="text-body-lg text-charcoal/80 max-w-2xl mb-8 leading-relaxed"
          >
            {article.excerpt}
          </motion.p>

          {/* Meta & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.55 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link
              href={`/blog/${article.slug}`}
              className="btn btn-primary group"
            >
              Read Article
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-4 text-sm text-charcoal/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric/20 to-lavender/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-electric">{article.author.avatar}</span>
                </div>
                <span>{article.author.name}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
