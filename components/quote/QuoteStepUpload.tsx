'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { QuoteFormData } from '@/lib/quote/types';
import { easing, duration } from '@/lib/animations';
import { Upload, FileCheck, X, Image, FileText } from 'lucide-react';

interface QuoteStepUploadProps {
  data: QuoteFormData;
  onUpdate: (data: Partial<QuoteFormData>) => void;
}

export function QuoteStepUpload({ data, onUpdate }: QuoteStepUploadProps) {
  const logoRef = useRef<HTMLInputElement>(null);
  const guidelinesRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpdate({
        hasLogo: true,
        logoFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGuidelinesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpdate({
        hasGuidelines: true,
        guidelinesFile: {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
    >
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">STEP 3 OF 5</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
            Share your brand assets
          </h2>
          <p className="text-[17px] text-charcoal/50 max-w-[480px] mx-auto">
            Upload your logo and brand guidelines so we can provide accurate recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`
              relative p-8 rounded-2xl border-2 border-dashed transition-all duration-500 text-center
              ${data.hasLogo
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-border/40 bg-white hover:border-electric/30 hover:bg-electric/[0.01]'
              }
            `}
          >
            <input
              ref={logoRef}
              type="file"
              accept=".pdf,.ai,.eps,.png,.jpg,.svg"
              onChange={handleLogoUpload}
              className="hidden"
            />

            {data.hasLogo ? (
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-poppins font-semibold text-rich mb-1">Logo Uploaded</h3>
                <p className="text-sm text-charcoal/45 mb-4">
                  {data.logoFile?.name || 'Uploaded file'}
                </p>
                <button
                  type="button"
                  onClick={() => onUpdate({ hasLogo: false, logoFile: null })}
                  className="inline-flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-red-500 transition-colors min-h-[44px] px-3 rounded-lg"
                >
                  <X className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => logoRef.current?.click()}
                className="w-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-ivory-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/5 transition-colors">
                  <Image className="w-7 h-7 text-charcoal/30" />
                </div>
                <h3 className="font-poppins font-semibold text-rich mb-1">Upload Logo</h3>
                <p className="text-sm text-charcoal/45 mb-3">
                  PDF, AI, EPS, PNG, JPG, or SVG
                </p>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ivory-100 text-sm font-medium text-charcoal/60 hover:bg-electric/10 hover:text-electric transition-colors">
                  <Upload className="w-4 h-4" />
                  Select File
                </span>
              </button>
            )}
          </motion.div>

          {/* Guidelines Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`
              relative p-8 rounded-2xl border-2 border-dashed transition-all duration-500 text-center
              ${data.hasGuidelines
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-border/40 bg-white hover:border-electric/30 hover:bg-electric/[0.01]'
              }
            `}
          >
            <input
              ref={guidelinesRef}
              type="file"
              accept=".pdf"
              onChange={handleGuidelinesUpload}
              className="hidden"
            />

            {data.hasGuidelines ? (
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-poppins font-semibold text-rich mb-1">Guidelines Uploaded</h3>
                <p className="text-sm text-charcoal/45 mb-4">
                  {data.guidelinesFile?.name || 'Uploaded file'}
                </p>
                <button
                  type="button"
                  onClick={() => onUpdate({ hasGuidelines: false, guidelinesFile: null })}
                  className="inline-flex items-center gap-1.5 text-sm text-charcoal/40 hover:text-red-500 transition-colors min-h-[44px] px-3 rounded-lg"
                >
                  <X className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => guidelinesRef.current?.click()}
                className="w-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-ivory-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-charcoal/30" />
                </div>
                <h3 className="font-poppins font-semibold text-rich mb-1">Brand Guidelines</h3>
                <p className="text-sm text-charcoal/45 mb-3">
                  PDF format preferred
                </p>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ivory-100 text-sm font-medium text-charcoal/60 hover:bg-electric/10 hover:text-electric transition-colors">
                  <Upload className="w-4 h-4" />
                  Select File
                </span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Skip option */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() =>
              onUpdate({
                hasLogo: false,
                hasGuidelines: false,
                logoFile: null,
                guidelinesFile: null,
              })
            }
            className="text-sm text-charcoal/40 hover:text-electric transition-colors min-h-[44px] px-4 rounded-lg"
          >
            I don&apos;t have these files ready — skip this step
          </button>
        </div>
      </div>
    </motion.div>
  );
}
