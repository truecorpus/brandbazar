'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
import { motion, AnimatePresence } from 'framer-motion';
import { easing, duration } from '@/lib/animations';
import { WHATSAPP_NUMBER } from '@/lib/config';
import { Button } from '@/components/ui/Button';
import {
  Send,
  Check,
  ChevronRight,
  Briefcase,
  Users,
  Sparkles,
  Calendar,
  Package,
  Gift,
  Megaphone,
  Palette,
  Building,
} from 'lucide-react';

const projectTypes = [
  { id: 'corporate-gifting', label: 'Corporate Gifting', icon: Gift },
  { id: 'welcome-kits', label: 'Employee Welcome Kits', icon: Users },
  { id: 'startup-branding', label: 'Startup Branding', icon: Sparkles },
  { id: 'event-branding', label: 'Event Branding', icon: Calendar },
  { id: 'packaging', label: 'Packaging Solutions', icon: Package },
  { id: 'merchandise', label: 'Custom Merchandise', icon: Briefcase },
  { id: 'promotional', label: 'Promotional Branding', icon: Megaphone },
  { id: 'other', label: 'Something Else', icon: Palette },
];

const timelines = [
  { id: 'asap', label: 'ASAP', detail: 'Within 2 weeks' },
  { id: '1-month', label: '1 Month', detail: 'Flexible' },
  { id: '2-3-months', label: '2–3 Months', detail: 'Planned' },
  { id: 'exploring', label: 'Just Exploring', detail: 'No rush' },
];

const budgets = [
  { id: 'under-50k', label: 'Under ₹50,000' },
  { id: '50k-1l', label: '₹50,000 – ₹1 Lakh' },
  { id: '1l-5l', label: '₹1 – ₹5 Lakhs' },
  { id: '5l-plus', label: '₹5 Lakhs+' },
  { id: 'discuss', label: 'Let\'s Discuss' },
];

const quantities = [
  { id: 'under-100', label: 'Under 100' },
  { id: '100-500', label: '100 – 500' },
  { id: '500-2k', label: '500 – 2,000' },
  { id: '2k-plus', label: '2,000+' },
];

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    quantity: '',
    budget: '',
    timeline: '',
    goals: '',
    message: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contact_form_submit', {
          event_category: 'engagement',
          event_label: formData.projectType,
        });
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = [
    formData.name && formData.email,
    formData.projectType,
    formData.timeline && formData.budget,
    formData.message,
  ].filter(Boolean).length;

  if (submitted) {
    return (
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/50 to-ivory" />
        <div className="container-brand relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easing.cinematic }}
            className="max-w-[600px] mx-auto text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 mb-8">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="font-poppins text-[32px] lg:text-[40px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
              Thank you for reaching out
            </h2>
            <p className="text-[17px] text-charcoal/55 leading-[1.7] mb-8">
              We have received your inquiry and our team will review it carefully. Expect a personalized response within 24 hours.
            </p>
            <div className="p-6 bg-white rounded-2xl border border-border/30 shadow-soft max-w-sm mx-auto">
              <p className="text-sm text-charcoal/50 mb-2">Prefer a faster response?</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20BrandBazar%2C%20I%20just%20submitted%20a%20consultation%20request`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2 w-full justify-center"
              >
                Continue on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />

      <div className="container-brand relative z-10">
        <div className="max-w-[800px] mx-auto">
          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-caption text-charcoal/30 tracking-widest">YOUR CONSULTATION</span>
              <span className="text-caption text-charcoal/30 tracking-widest">{progress} OF 4</span>
            </div>
            <div className="h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric to-lavender rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: easing.cinematic }}
              />
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* SECTION 1: About You */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-rich">About You</h2>
                  <p className="text-sm text-charcoal/45">Who are we speaking with?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Company name"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* SECTION 2: Project Type */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-rich">Project Type</h2>
                  <p className="text-sm text-charcoal/45">What are we creating together?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateField('projectType', type.id)}
                    className={`
                      relative p-5 rounded-xl border text-left transition-all duration-300 group
                      ${formData.projectType === type.id
                        ? 'border-electric bg-electric/5 shadow-soft'
                        : 'border-border/30 bg-white hover:border-electric/20 hover:shadow-soft'
                      }
                    `}
                  >
                    <type.icon className={`w-5 h-5 mb-3 transition-colors ${formData.projectType === type.id ? 'text-electric' : 'text-charcoal/30 group-hover:text-electric'}`} />
                    <span className={`text-[13px] font-semibold leading-tight block ${formData.projectType === type.id ? 'text-electric' : 'text-rich'}`}>
                      {type.label}
                    </span>
                    {formData.projectType === type.id && (
                      <motion.div
                        layoutId="projectCheck"
                        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-electric flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* SECTION 3: Scope & Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-rich">Scope & Timeline</h2>
                  <p className="text-sm text-charcoal/45">Help us understand the scale and urgency</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-[13px] font-medium text-charcoal/60 mb-3 block">Expected Quantity</label>
                <div className="flex flex-wrap gap-2">
                  {quantities.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => updateField('quantity', q.id)}
                      className={`
                        px-5 py-2.5 rounded-full text-[13px] font-medium border transition-all duration-300
                        ${formData.quantity === q.id
                          ? 'bg-rich text-white border-rich'
                          : 'bg-white text-charcoal/60 border-border/30 hover:border-charcoal/20'
                        }
                      `}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <label className="text-[13px] font-medium text-charcoal/60 mb-3 block">Timeline</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timelines.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateField('timeline', t.id)}
                      className={`
                        p-4 rounded-xl border text-left transition-all duration-300
                        ${formData.timeline === t.id
                          ? 'border-electric bg-electric/5'
                          : 'border-border/30 bg-white hover:border-electric/20'
                        }
                      `}
                    >
                      <span className={`text-[14px] font-semibold block ${formData.timeline === t.id ? 'text-electric' : 'text-rich'}`}>
                        {t.label}
                      </span>
                      <span className="text-xs text-charcoal/40">{t.detail}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-[13px] font-medium text-charcoal/60 mb-3 block">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => updateField('budget', b.id)}
                      className={`
                        px-5 py-2.5 rounded-full text-[13px] font-medium border transition-all duration-300
                        ${formData.budget === b.id
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
            </motion.div>

            {/* SECTION 4: Goals & Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h2 className="font-poppins text-xl font-semibold text-rich">Your Vision</h2>
                  <p className="text-sm text-charcoal/45">Tell us what success looks like</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Branding Goals</label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => updateField('goals', e.target.value)}
                    placeholder="What are you trying to achieve? (e.g., improve client retention, launch a new product, welcome remote employees...)"
                    rows={3}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-charcoal/60">Additional Details *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Anything else we should know? Share your vision, concerns, or inspiration..."
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-border/40 text-rich placeholder:text-charcoal/25 outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/10 transition-all text-[15px] resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* SUBMIT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, ease: easing.cinematic }}
              className="pt-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 lg:p-8 bg-white rounded-2xl border border-border/30 shadow-soft">
                <div>
                  <p className="font-poppins font-semibold text-rich mb-1">Ready to submit?</p>
                  <p className="text-sm text-charcoal/45">We will respond within 24 hours with a personalized approach.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {submitError && (
                    <p className="text-sm text-red-500 text-right">{submitError}</p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full justify-center"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
}
