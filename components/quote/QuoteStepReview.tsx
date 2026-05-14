'use client';

import { motion } from 'framer-motion';
import { QuoteFormData } from '@/lib/quote/types';
import { quoteProducts, packagingOptions, timelineOptions, budgetOptions, brandColorOptions } from '@/lib/quote/data';
import { easing, duration } from '@/lib/animations';
import { Send, Check, Package, Palette, Clock, Wallet, User, Mail, Building2, Phone, MessageSquare, FileCheck, Loader2 } from 'lucide-react';

interface QuoteStepReviewProps {
  data: QuoteFormData;
  onUpdate: (data: Partial<QuoteFormData>) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function QuoteStepReview({ data, onUpdate, onSubmit, isSubmitting }: QuoteStepReviewProps) {
  const getProductName = (id: string) => quoteProducts.find((p) => p.id === id)?.name || id;
  const getPackagingName = (id: string) => packagingOptions.find((p) => p.id === id)?.name || id;
  const getTimelineLabel = (id: string) => timelineOptions.find((t) => t.id === id)?.label || id;
  const getBudgetLabel = (id: string) => budgetOptions.find((b) => b.id === id)?.label || id;
  const getColorName = (hex: string) => brandColorOptions.find((c) => c.hex === hex)?.name || hex;

  const isComplete = data.products.length > 0 && data.name && data.email;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
    >
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">STEP 5 OF 5</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
            Review your inquiry
          </h2>
          <p className="text-[17px] text-charcoal/50 max-w-[480px] mx-auto">
            Confirm everything looks right before we prepare your personalized quote.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {/* Products */}
          <ReviewSection icon={Package} title="Selected Products">
            {data.products.map((p) => (
              <div key={p.productId} className="flex items-center justify-between py-2">
                <span className="text-[15px] text-rich font-medium">{getProductName(p.productId)}</span>
                <span className="text-[15px] text-electric font-semibold tabular-nums">
                  {p.quantity.toLocaleString()} units
                </span>
              </div>
            ))}
          </ReviewSection>

          {/* Brand Details */}
          <ReviewSection icon={Palette} title="Brand Details">
            <ReviewRow label="Primary Color" value={data.brandColor ? getColorName(data.brandColor) : 'Not specified'} />
            <ReviewRow label="Packaging" value={data.packaging ? getPackagingName(data.packaging) : 'Not specified'} />
            <ReviewRow label="Logo" value={data.hasLogo ? 'Uploaded ✓' : 'Not provided'} />
            <ReviewRow label="Brand Guidelines" value={data.hasGuidelines ? 'Uploaded ✓' : 'Not provided'} />
          </ReviewSection>

          {/* Timeline & Budget */}
          <ReviewSection icon={Clock} title="Timeline & Budget">
            <ReviewRow label="Delivery" value={data.timeline ? getTimelineLabel(data.timeline) : 'Not specified'} />
            <ReviewRow label="Budget" value={data.budget ? getBudgetLabel(data.budget) : 'Not specified'} />
          </ReviewSection>

          {/* Contact */}
          <ReviewSection icon={User} title="Contact Information">
            <ReviewRow label="Name" value={data.name || 'Not provided'} />
            <ReviewRow label="Email" value={data.email || 'Not provided'} />
            {data.company && <ReviewRow label="Company" value={data.company} />}
            {data.phone && <ReviewRow label="Phone" value={data.phone} />}
            {data.message && <ReviewRow label="Notes" value={data.message} />}
          </ReviewSection>
        </div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: duration.slow }}
          className="p-6 lg:p-8 bg-white rounded-2xl border border-border/30 shadow-soft"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-poppins font-semibold text-rich mb-1">
                {isComplete ? 'Ready to submit?' : 'Almost there'}
              </p>
              <p className="text-sm text-charcoal/45">
                {isComplete
                  ? 'We will prepare a detailed quote within 24 hours.'
                  : 'Please fill in your name and email to continue.'}
              </p>
            </div>
            <motion.button
              whileHover={isComplete && !isSubmitting ? { scale: 1.02 } : {}}
              whileTap={isComplete && !isSubmitting ? { scale: 0.98 } : {}}
              onClick={onSubmit}
              disabled={!isComplete || isSubmitting}
              className={`
                btn inline-flex items-center gap-2 px-8 py-4 text-base
                ${isComplete && !isSubmitting
                  ? 'btn-primary'
                  : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  Submitting
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : isComplete ? (
                <>
                  Submit Quote Request
                  <Send className="w-4 h-4" />
                </>
              ) : (
                'Complete required fields'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ReviewSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 lg:p-6 bg-white rounded-2xl border border-border/30">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/20">
        <Icon className="w-4 h-4 text-electric" />
        <h3 className="font-poppins text-sm font-semibold text-rich">{title}</h3>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[14px] text-charcoal/45">{label}</span>
      <span className="text-[14px] text-rich font-medium text-right">{value}</span>
    </div>
  );
}
