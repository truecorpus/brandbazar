'use client';

import { motion } from 'framer-motion';
import { ArticleMeta } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';
import { ShareBar } from './ShareBar';
import { Twitter, Linkedin } from 'lucide-react';

interface ArticleAuthorProps {
  meta: ArticleMeta;
}

export function ArticleAuthor({ meta }: ArticleAuthorProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
      className="section-sm border-t border-border/30"
    >
      <div className="container-brand">
        <div className="max-w-[65ch] mx-auto">
          {/* Author card */}
          <div className="relative p-8 lg:p-10 bg-white rounded-2xl border border-border/40 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric/40 via-lavender/30 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-electric/[0.02] blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-electric/15 to-lavender/20 flex items-center justify-center">
                  <span className="text-2xl lg:text-3xl font-bold text-electric font-poppins">
                    {meta.author.avatar}
                  </span>
                </div>
                {/* Status dot */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-poppins text-lg lg:text-xl font-semibold text-rich">
                      {meta.author.name}
                    </h3>
                    <p className="text-sm text-charcoal/50 mt-0.5">{meta.author.role}</p>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-electric/10 flex items-center justify-center transition-colors group"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4 text-charcoal/40 group-hover:text-electric transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-electric/10 flex items-center justify-center transition-colors group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-charcoal/40 group-hover:text-electric transition-colors" />
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-[15px] text-charcoal/65 leading-[1.7]">
                  {meta.author.bio}
                </p>

                {/* Share bar */}
                <div className="mt-6 pt-6 border-t border-border/30">
                  <ShareBar title={meta.title} slug={meta.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
