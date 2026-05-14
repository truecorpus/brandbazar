'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/config';
import { gtagEvent, EVENT_WHATSAPP_CLICK, EVENT_CTA_CLICK } from '@/lib/analytics';
import { getAllSolutions } from '@/lib/solutions/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Products', href: '/products' },
  { name: 'Journal', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const solutions = getAllSolutions().map((solution) => ({
  name: solution.name,
  href: `/solutions/${solution.slug}`,
}));

const products = [
  { name: 'Custom Mugs', href: '/products/custom-mugs' },
  { name: 'Branded Bottles', href: '/products/branded-bottles' },
  { name: 'Premium Notebooks', href: '/products/premium-notebooks' },
  { name: 'ID Cards & Badges', href: '/products/id-cards' },
  { name: 'Custom Packaging', href: '/products/custom-packaging' },
  { name: 'Corporate Gifts', href: '/products/corporate-gifts' },
  { name: 'Employee Kits', href: '/products/employee-kits' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Logo />
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-ivory-200 flex items-center justify-center hover:bg-ivory-300 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-rich" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.name === 'Solutions' ? (
                      <div className="py-4">
                        <span className="text-h3 font-poppins font-semibold text-rich block mb-4">
                          Solutions
                        </span>
                        <div className="pl-4 space-y-3 border-l-2 border-border">
                          {solutions.map((solution, sIndex) => (
                            <motion.div
                              key={solution.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.08 + sIndex * 0.05 + 0.2,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <Link
                                href={solution.href}
                                onClick={onClose}
                                className="text-body-lg text-charcoal hover:text-electric transition-colors duration-200 block min-h-[44px] flex items-center"
                              >
                                {solution.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : link.name === 'Products' ? (
                      <div className="py-4">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="text-h3 font-poppins font-semibold text-rich hover:text-electric transition-colors duration-200 block mb-4"
                        >
                          {link.name}
                        </Link>
                        <div className="pl-4 space-y-3 border-l-2 border-border">
                          {products.map((product, pIndex) => (
                            <motion.div
                              key={product.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.08 + pIndex * 0.05 + 0.2,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <Link
                                href={product.href}
                                onClick={onClose}
                                className="text-body-lg text-charcoal hover:text-electric transition-colors duration-200 block min-h-[44px] flex items-center"
                              >
                                {product.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block py-4 text-h3 font-poppins font-semibold text-rich hover:text-electric transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer CTA */}
            <motion.div
              className="px-6 py-6 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                href="/get-a-quote"
                onClick={() => { gtagEvent(EVENT_CTA_CLICK, { location: 'mobile_menu', label: 'get_quote' }); onClose(); }}
                variant="primary"
                className="w-full justify-center mb-3"
              >
                Get a Quote
              </Button>
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                onClick={() => {
                  gtagEvent(EVENT_WHATSAPP_CLICK, { location: 'mobile_menu' });
                  onClose();
                }}
                className="btn btn-secondary w-full justify-center"
              >
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
