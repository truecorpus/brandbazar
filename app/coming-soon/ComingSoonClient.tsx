'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { CinematicBackground } from '@/components/coming-soon/CinematicBackground';
import { Button } from '@/components/ui/Button';
import { BRAND_NAME, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/lib/config';
import { easing, duration } from '@/lib/animations';
import { Send, CheckCircle, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import Image from 'next/image';

// ─── Animation Variants ───

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

const itemFadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

// ─── Cursor Glow (desktop only) ───

function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 150);
      cursorY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[1] opacity-0 mix-blend-soft-light"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        background: 'radial-gradient(circle, rgba(77, 124, 254, 0.08) 0%, transparent 70%)',
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}

// ─── Email Capture Component ───

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/coming-soon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div variants={itemFadeUp} className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: duration.normal, ease: easing.smooth }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-12 h-12 rounded-full bg-electric/10 flex items-center justify-center"
            >
              <CheckCircle className="w-6 h-6 text-electric" />
            </motion.div>
            <p className="text-body font-jakarta text-rich-600 text-center">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1 group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rich-500/40 group-focus-within:text-electric/60 transition-colors pointer-events-none" />
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                disabled={status === 'submitting'}
                className="input-brand pl-10 pr-4 py-3.5 w-full text-sm disabled:opacity-60 bg-white/70 backdrop-blur-sm"
              />
            </div>
            <Button
              type="submit"
              isLoading={status === 'submitting'}
              disabled={status === 'submitting'}
              className="whitespace-nowrap"
              leftIcon={<Send className="w-4 h-4" />}
            >
              Get Early Access
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 mt-3 text-center"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── WhatsApp CTA ───

function WhatsAppCTA() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.div variants={itemFadeUp} className="flex flex-col items-center gap-4">
      <p className="text-caption text-charcoal/50">Or reach out directly</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-border/80 bg-white/50 backdrop-blur-md hover:bg-white hover:border-electric/25 hover:shadow-soft transition-all duration-500"
      >
        <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/15 transition-colors">
          <MessageCircle className="w-4 h-4 text-green-600" />
        </span>
        <span className="text-sm font-jakarta font-medium text-rich-600 group-hover:text-rich transition-colors">
          Chat on WhatsApp
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-rich-500 group-hover:text-electric group-hover:translate-x-0.5 transition-all duration-300" />
      </a>
    </motion.div>
  );
}

// ─── Main Page Component ───

export function ComingSoonClient() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" ref={ref}>
      <CinematicBackground />
      <CursorGlow />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Bar */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.1 }}
          className="w-full px-6 sm:px-8 lg:px-12 py-6"
        >
          <div className="max-w-container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-full.svg"
                alt={BRAND_NAME}
                width={160}
                height={32}
                className="h-7 sm:h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
                priority
              />
            </Link>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-caption text-charcoal/40 hidden sm:block tracking-[0.12em]"
            >
              Launching Soon
            </motion.span>
          </div>
        </motion.header>

        {/* Hero Content */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 sm:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Overline */}
            <motion.div variants={itemFadeUp} className="flex items-center gap-3">
              <motion.div
                variants={lineReveal}
                className="w-8 sm:w-12 h-[1px] bg-electric/30 origin-left"
              />
              <span className="text-caption text-electric tracking-[0.15em] font-medium">
                The Next Chapter
              </span>
              <motion.div
                variants={lineReveal}
                className="w-8 sm:w-12 h-[1px] bg-electric/30 origin-right"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemFadeScale} className="space-y-2">
              <h1 className="text-display font-poppins text-rich leading-[1.05] tracking-tight text-wrap-balance">
                Something
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  Exceptional
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[2px] sm:h-[3px] bg-electric/15 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: duration.slower,
                      ease: easing.cinematic,
                      delay: 1.2,
                    }}
                  />
                </span>{' '}
                Is Coming
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={itemFadeUp}
              className="text-body-lg text-charcoal/60 max-w-lg sm:max-w-xl leading-relaxed text-wrap-balance"
            >
              We are crafting the future of corporate branding experiences. Premium merchandise,
              employee kits, and brand touchpoints — designed to be remembered.
            </motion.p>

            {/* Divider */}
            <motion.div variants={itemFadeUp} className="w-12 h-[1px] bg-border" />

            {/* Email Capture */}
            <EmailCapture />

            {/* WhatsApp CTA */}
            <WhatsAppCTA />

            {/* Trust indicator */}
            <motion.p
              variants={itemFadeUp}
              className="text-body-sm text-charcoal/30 mt-2"
            >
              Be the first to know when we launch
            </motion.p>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease: easing.cinematic, delay: 1.8 }}
          className="w-full px-6 sm:px-8 lg:px-12 py-8"
        >
          <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-body-sm text-charcoal/30">
              &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-body-sm text-charcoal/30 hover:text-electric transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-body-sm text-charcoal/30 hover:text-electric transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
