'use client';

import { motion } from 'framer-motion';
import { useQuote } from '@/lib/quote/QuoteContext';
import { WHATSAPP_NUMBER } from '@/lib/config';
import { easing, duration } from '@/lib/animations';
import { Check, MessageCircle, Clock, FileText } from 'lucide-react';

export function QuoteSuccess() {
  const { quoteId } = useQuote();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar%2C%20I%20just%20submitted%20a%20quote%20request`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center"
    >
      <div className="container-brand w-full py-20">
        <div className="max-w-[600px] mx-auto text-center">
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easing.bounce }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-50 mb-8"
          >
            <Check className="w-10 h-10 text-emerald-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: duration.slower, ease: easing.cinematic }}
          >
            <h2 className="font-poppins text-[36px] lg:text-[48px] font-bold text-rich leading-[1.05] tracking-[-0.03em] text-wrap-balance mb-4">
              Quote request received
            </h2>
            <p className="text-[17px] text-charcoal/55 leading-[1.7] mb-2 max-w-[480px] mx-auto">
              Our team is already reviewing your requirements. Expect a detailed, personalized quote within 24 hours.
            </p>
            {quoteId && (
              <p className="text-sm text-charcoal/40 mb-8 font-mono">{quoteId}</p>
            )}
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: duration.slow, ease: easing.cinematic }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {[
              { icon: Clock, title: '24 Hours', desc: 'Initial response' },
              { icon: FileText, title: 'Detailed Quote', desc: 'Itemized breakdown' },
              { icon: MessageCircle, title: 'Consultation', desc: 'Free strategy call' },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-white rounded-xl border border-border/30">
                <item.icon className="w-5 h-5 text-electric mx-auto mb-2" />
                <p className="font-poppins text-sm font-semibold text-rich">{item.title}</p>
                <p className="text-xs text-charcoal/40">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: duration.slow }}
          >
            <p className="text-sm text-charcoal/40 mb-4">Want to discuss immediately?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Continue on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
