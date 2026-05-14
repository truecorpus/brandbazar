'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SearchOverlay } from './SearchOverlay';
import { Search, ArrowLeft } from 'lucide-react';

interface BlogHeaderProps {
  showBackLink?: boolean;
}

export function BlogHeader({ showBackLink = false }: BlogHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-[90] bg-ivory/90 backdrop-blur-xl border-b border-border/40">
        <div className="container-brand">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back or Brand */}
            <div className="flex items-center gap-4">
              {showBackLink ? (
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-rich transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Journal</span>
                </Link>
              ) : (
                <Link href="/" className="font-poppins font-bold text-rich text-lg">
                  BrandBazar
                </Link>
              )}
            </div>

            {/* Center: Title */}
            <Link href="/blog" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-poppins font-semibold text-rich text-sm tracking-wider">
                THE JOURNAL
              </span>
            </Link>

            {/* Right: Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-ivory-200/80 hover:bg-ivory-200 transition-colors text-sm text-charcoal/60 min-h-[44px]"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex px-1.5 py-0.5 rounded bg-white text-xs text-charcoal/40 font-mono border border-border">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
