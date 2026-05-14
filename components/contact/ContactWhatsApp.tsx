'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/config';

export function ContactWhatsApp() {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-emerald-50/20 to-ivory" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[700px] mx-auto"
        >
          <div className="relative p-8 lg:p-12 bg-white rounded-2xl border border-border/30 shadow-soft overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/[0.03] blur-[80px]" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-emerald-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-poppins text-xl lg:text-2xl font-semibold text-rich mb-2">
                  Prefer to chat on WhatsApp?
                </h3>
                <p className="text-[15px] text-charcoal/55 leading-[1.7] mb-4">
                  Sometimes a quick conversation is the best way to start. Send us a message and we will respond within a few hours.
                </p>
                <div className="flex items-center gap-2 text-[13px] text-emerald-600 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Typically responds in under 2 hours
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar%2C%20I%20am%20interested%20in%20discussing%20a%20branding%20project`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors group"
              >
                Start Chat
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
