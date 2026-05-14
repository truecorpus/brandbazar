'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/config';

export function FAQContactCTA() {
  return (
    <section className="relative section overflow-hidden bg-rich">
      <div className="absolute inset-0 texture-dots opacity-[0.03]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-electric/[0.06] blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.05] blur-[120px]" />

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
          >
            <span className="text-caption text-white/30 tracking-[0.2em] mb-4 block">STILL HAVE QUESTIONS?</span>
            <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-white leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-5">
              Every question deserves a human answer
            </h2>
            <p className="text-[17px] text-white/45 leading-[1.7] mb-8 max-w-[440px]">
              Our team responds to every inquiry within 4 hours during business days. No bots, no templates — just thoughtful answers from people who understand your project.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Start a Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/quote" className="btn btn-ghost text-white/60 hover:text-white border-white/10 hover:border-white/20">
                Request a Quote
              </Link>
            </div>
          </motion.div>

          {/* Right: Contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.15 }}
            className="space-y-3"
          >
            {[
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: 'Instant replies during business hours',
                href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar`,
                external: true,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+91 99999 99999',
                href: 'tel:+919999999999',
                external: false,
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'hello@brandbazar.com',
                href: 'mailto:hello@brandbazar.com',
                external: false,
              },
            ].map((method, i) => {
              const Icon = method.icon;
              const LinkComponent = method.external ? 'a' : Link;
              const props = method.external
                ? { href: method.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: method.href };
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
                >
                  <LinkComponent
                    {...props}
                    className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-white/40 mb-0.5">{method.label}</p>
                      <p className="text-[15px] text-white/80 font-medium">{method.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </LinkComponent>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
