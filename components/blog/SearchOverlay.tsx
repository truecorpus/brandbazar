'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/blog/types';
import { searchArticles } from '@/lib/blog/data';
import { easing, duration } from '@/lib/animations';
import { Search, X, ArrowRight, Clock, Tag } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setResults(searchArticles(query));
      } else {
        setResults([]);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast }}
          className="fixed inset-0 z-[600] bg-rich/60 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="relative mx-auto mt-[15vh] max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative bg-white rounded-2xl shadow-strong overflow-hidden">
              <div className="flex items-center px-6 py-5 border-b border-border/60">
                <Search className="w-5 h-5 text-charcoal/40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, topics, authors..."
                  className="flex-1 ml-4 text-lg text-rich placeholder:text-charcoal/30 outline-none bg-transparent"
                />
                <button
                  onClick={onClose}
                  className="ml-4 w-11 h-11 rounded-full hover:bg-ivory-200 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-charcoal/50" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto">
                {query.trim() && results.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <Search className="w-10 h-10 text-charcoal/20 mx-auto mb-3" />
                    <p className="text-charcoal/50">No articles found for &ldquo;{query}&rdquo;</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-3">
                    <div className="px-6 py-2 text-caption text-charcoal/40">
                      {results.length} {results.length === 1 ? 'article' : 'articles'} found
                    </div>
                    {results.map((article, i) => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        onClick={onClose}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: duration.fast }}
                          className="flex items-start gap-4 px-6 py-4 hover:bg-ivory-50 transition-colors group"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${article.coverGradient} flex-shrink-0`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-rich group-hover:text-electric transition-colors line-clamp-1">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-charcoal/50">
                              <span style={{ color: article.category.color }}>
                                {article.category.name}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-border" />
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime} min
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-charcoal/20 group-hover:text-electric transition-colors flex-shrink-0 mt-1" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                )}

                {!query.trim() && (
                  <div className="px-6 py-8">
                    <p className="text-caption text-charcoal/40 mb-4">POPULAR TOPICS</p>
                    <div className="flex flex-wrap gap-2">
                      {['employee kits', 'corporate gifting', 'startup branding', 'packaging', 'welcome kits', 'merchandise trends'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ivory-100 text-sm text-charcoal/70 hover:bg-ivory-200 transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Keyboard hint */}
            <div className="mt-4 text-center">
              <span className="text-xs text-white/40">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-xs">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
