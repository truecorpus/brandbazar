'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { easing, duration } from '@/lib/animations';
import { BRAND_NAME } from '@/lib/config';

const footerLinks = {
  solutions: [
    { name: 'Custom Mugs', href: '/products/mugs' },
    { name: 'Branded Bottles', href: '/products/bottles' },
    { name: 'Employee Kits', href: '/products/employee-kits' },
    { name: 'Event Merch', href: '/products/events' },
    { name: 'Packaging', href: '/products/packaging' },
    { name: 'Corporate Gifts', href: '/products/gifts' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Process', href: '/process' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Get a Quote', href: '/get-a-quote' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative bg-rich text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-electric/4 blur-[120px] pointer-events-none" />

      <div className="relative pt-20 lg:pt-28 pb-14 lg:pb-16 border-b border-white/8">
        <div className="container-brand">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            <h2 className="text-display-sm lg:text-display-md text-white mb-5">
              Branding Experiences <span className="text-electric">Designed To Be Remembered.</span>
            </h2>
            <p className="text-body-lg text-white/45 max-w-xl">
              Let&apos;s create something tangible, premium, and unmistakably yours.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative py-14 lg:py-16">
        <div className="container-brand">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <motion.div
              className="col-span-2 lg:col-span-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: 0.08, ease: easing.cinematic }}
            >
              <Link href="/" className="inline-block mb-5">
                <span className="font-poppins font-bold text-xl tracking-tight text-white">
                  {BRAND_NAME}
                </span>
              </Link>
              <p className="text-body-sm text-white/35 max-w-xs mb-5 leading-relaxed">
                Premium corporate branding and merchandise solutions for companies that care about every touchpoint.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-full bg-white/4 border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 lg:col-start-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: 0.16, ease: easing.cinematic }}
            >
              <span className="text-caption text-white/25 mb-4 block">Solutions</span>
              <ul className="space-y-2.5">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: 0.24, ease: easing.cinematic }}
            >
              <span className="text-caption text-white/25 mb-4 block">Company</span>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration.normal, delay: 0.32, ease: easing.cinematic }}
            >
              <span className="text-caption text-white/25 mb-4 block">Resources</span>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative py-6 border-t border-white/8">
        <div className="container-brand">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-body-sm text-white/25"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration.normal, delay: 0.4 }}
            >
              © 2026 {BRAND_NAME}. All rights reserved.
            </motion.p>

            <div className="flex items-center gap-5">
              <Link href="/privacy" className="text-body-sm text-white/25 hover:text-white/50 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-body-sm text-white/25 hover:text-white/50 transition-colors">
                Terms
              </Link>

              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-white/4 border border-white/8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all duration-300"
                aria-label="Back to top"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
