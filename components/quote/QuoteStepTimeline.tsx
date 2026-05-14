'use client';

import { motion } from 'framer-motion';
import { QuoteFormData } from '@/lib/quote/types';
import { timelineOptions, budgetOptions } from '@/lib/quote/data';
import { easing, duration } from '@/lib/animations';
import { Calendar, Wallet, User, Mail, Building2, Phone, MessageSquare } from 'lucide-react';

interface QuoteStepTimelineProps {
  data: QuoteFormData;
  onUpdate: (data: Partial<QuoteFormData>) => void;
}

export function QuoteStepTimeline({ data, onUpdate }: QuoteStepTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">STEP 4 OF 5</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
            Timeline, budget & contact
          </h2>
          <p className="text-[17px] text-charcoal/50 max-w-[480px] mx-auto">
            Help us understand your constraints so we can propose the right approach.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-electric" />
            </div>
            <h3 className="font-poppins text-lg font-semibold text-rich">Delivery Timeline</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {timelineOptions.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onUpdate({ timeline: t.id })}
                className={`
                  p-5 rounded-xl border text-left transition-all duration-300
                  ${data.timeline === t.id
                    ? 'border-electric bg-electric/[0.03]'
                    : 'border-border/30 bg-white hover:border-electric/20'
                  }
                `}
              >
                <span className={`font-poppins text-sm font-semibold block mb-1 ${data.timeline === t.id ? 'text-electric' : 'text-rich'}`}>
                  {t.label}
                </span>
                <span className="text-xs text-charcoal/40">{t.detail}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-electric" />
            </div>
            <h3 className="font-poppins text-lg font-semibold text-rich">Budget Range</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onUpdate({ budget: b.id })}
                className={`
                  px-6 py-3 rounded-full text-[13px] font-medium border transition-all duration-300 min-h-[44px]
                  ${data.budget === b.id
                    ? 'bg-rich text-white border-rich'
                    : 'bg-white text-charcoal/60 border-border/30 hover:border-charcoal/20'
                  }
                `}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
              <User className="w-5 h-5 text-electric" />
            </div>
            <h3 className="font-poppins text-lg font-semibold text-rich">Your Contact Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-charcoal/60 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-charcoal/60 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="you@company.com"
                className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-charcoal/60 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Company
              </label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => onUpdate({ company: e.target.value })}
                placeholder="Company name"
                className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-charcoal/60 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Phone Number
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onUpdate({ phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-base"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-[13px] font-medium text-charcoal/60 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Additional Notes
              </label>
              <textarea
                value={data.message}
                onChange={(e) => onUpdate({ message: e.target.value })}
                placeholder="Any specific requirements, preferences, or context we should know..."
                rows={3}
                className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-base resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
