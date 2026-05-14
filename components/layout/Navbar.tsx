'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { WHATSAPP_NUMBER } from '@/lib/config';
import { useQuote } from '@/lib/quote/QuoteContext';
import { useQuoteDrawer } from '@/components/quote/QuoteDrawerProvider';
import { gtagEvent, EVENT_WHATSAPP_CLICK, EVENT_CTA_CLICK } from '@/lib/analytics';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Products', href: '/products' },
  { name: 'Journal', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { formData } = useQuote();
  const { openDrawer } = useQuoteDrawer();

  // Hide navbar on coming soon page for immersive experience
  if (pathname === '/' || pathname === '/coming-soon') {
    return null;
  }

  const { scrollY } = useScroll({ layoutEffect: false });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollThreshold = 50;

    setScrolled(latest > scrollThreshold);

    if (latest > 400) {
      const goingDown = latest > previous + 2;
      setHidden(goingDown);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-border/40 shadow-soft'
            : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}

      >
        <div className="container-brand">
          <nav
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              scrolled ? 'h-16 lg:h-[72px]' : 'h-18 lg:h-22'
            )}
            role="navigation"
            aria-label="Main navigation"
          >
            <Logo />

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isActive={pathname === link.href}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gtagEvent(EVENT_WHATSAPP_CLICK, { location: 'navbar' })}
                className="w-11 h-11 rounded-full bg-ivory flex items-center justify-center hover:bg-ivory-200 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              <div className="relative">
                <Button onClick={() => { gtagEvent(EVENT_CTA_CLICK, { location: 'navbar', label: 'get_quote' }); openDrawer(); }} size="sm">Get a Quote</Button>
                {formData.products.length > 0 && (
                  <button
                    onClick={openDrawer}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-electric text-white text-xs font-bold rounded-full flex items-center justify-center cursor-pointer"
                    aria-label={`Open quote drawer with ${formData.products.length} items`}
                  >
                    {formData.products.length}
                  </button>
                )}
              </div>
            </div>

            <button
              className="lg:hidden w-11 h-11 rounded-full bg-ivory flex items-center justify-center hover:bg-ivory-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-rich rounded-full origin-left"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? -1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="w-full h-0.5 bg-rich rounded-full"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    scaleX: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-rich rounded-full origin-left"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          </nav>
        </div>

      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="h-18 lg:h-22" />
    </>
  );
}
