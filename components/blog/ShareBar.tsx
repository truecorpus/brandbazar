'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Link2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { easing, duration } from '@/lib/animations';

interface ShareBarProps {
  title: string;
  slug: string;
}

export function ShareBar({ title, slug }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `https://brandbazar.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-caption text-charcoal/40 mr-2 hidden sm:inline">SHARE</span>
      
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full bg-ivory-200 hover:bg-electric/10 flex items-center justify-center transition-colors group"
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4 text-charcoal/50 group-hover:text-electric transition-colors" />
        </motion.a>
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="w-11 h-11 rounded-full bg-ivory-200 hover:bg-electric/10 flex items-center justify-center transition-colors group"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Link2 className="w-4 h-4 text-charcoal/50 group-hover:text-electric transition-colors" />
        )}
      </motion.button>
    </div>
  );
}
