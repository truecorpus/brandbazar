'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section bg-rich relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-electric/8 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-lavender/6 blur-3xl" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-lavender/20 mb-8">
            <Sparkles className="w-6 h-6 text-electric" />
          </div>

          <h2 className="font-poppins text-display-sm text-white mb-4 text-wrap-balance">
            The BrandBazar Journal
          </h2>
          <p className="text-body-lg text-white/60 mb-2 max-w-lg mx-auto">
            Weekly insights on branding psychology, corporate identity, and merchandise strategy — 
            crafted for leaders who believe every touchpoint matters.
          </p>
          <p className="text-sm text-white/30 mb-10">
            Join 2,400+ brand leaders. No spam. Unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-electric/50 focus:bg-white/15 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'success'}
              className={`
                px-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all
                ${status === 'success'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-electric text-white hover:bg-electric-600'
                }
              `}
            >
              {status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
