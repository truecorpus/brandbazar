'use client';

import { motion } from 'framer-motion';
import { stepLabels } from '@/lib/quote/data';

interface QuoteStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function QuoteStepIndicator({ currentStep, totalSteps }: QuoteStepIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-xl border-b border-border/20">
      <div className="container-brand py-4">
        {/* Progress bar */}
        <div className="h-[2px] bg-border/30 rounded-full mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-electric to-lavender rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Step pills */}
        <div className="flex items-center justify-between">
          {stepLabels.map((label, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;

            return (
              <div key={label} className="flex items-center">
                <motion.button
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-full text-xs font-medium transition-all duration-300 min-h-[44px]
                    ${isActive
                      ? 'bg-rich text-white'
                      : isCompleted
                        ? 'bg-electric/10 text-electric'
                        : 'bg-transparent text-charcoal/30'
                    }
                  `}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${isActive
                        ? 'bg-white text-rich'
                        : isCompleted
                          ? 'bg-electric text-white'
                          : 'bg-charcoal/10 text-charcoal/40'
                      }
                    `}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </motion.button>

                {i < stepLabels.length - 1 && (
                  <div
                    className={`w-4 lg:w-8 h-px mx-1 lg:mx-2 ${
                      isCompleted ? 'bg-electric/30' : 'bg-border/30'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
