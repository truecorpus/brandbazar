'use client';

import { motion } from 'framer-motion';
import { QuoteFormData } from '@/lib/quote/types';
import { quoteProducts, packagingOptions, brandColorOptions } from '@/lib/quote/data';
import { easing, duration } from '@/lib/animations';
import { Minus, Plus } from 'lucide-react';

interface QuoteStepDetailsProps {
  data: QuoteFormData;
  onUpdate: (data: Partial<QuoteFormData>) => void;
}

export function QuoteStepDetails({ data, onUpdate }: QuoteStepDetailsProps) {
  const updateQuantity = (productId: string, delta: number) => {
    const product = quoteProducts.find((p) => p.id === productId);
    if (!product) return;

    const updated = data.products.map((p) => {
      if (p.productId === productId) {
        const newQty = Math.max(product.minQty, Math.min(product.maxQty, p.quantity + delta));
        return { ...p, quantity: newQty };
      }
      return p;
    });
    onUpdate({ products: updated });
  };

  const setQuantity = (productId: string, qty: number) => {
    const product = quoteProducts.find((p) => p.id === productId);
    if (!product) return;
    const clamped = Math.max(product.minQty, Math.min(product.maxQty, qty));

    const updated = data.products.map((p) =>
      p.productId === productId ? { ...p, quantity: clamped } : p
    );
    onUpdate({ products: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">STEP 2 OF 5</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
            Configure your quantities
          </h2>
          <p className="text-[17px] text-charcoal/50 max-w-[480px] mx-auto">
            Fine-tune quantities, select your brand color, and choose packaging.
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="space-y-4 mb-12">
          {data.products.map((item) => {
            const product = quoteProducts.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 lg:p-6 bg-white rounded-2xl border border-border/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-poppins font-semibold text-rich">{product.name}</h3>
                    <p className="text-xs text-charcoal/40">
                      Min: {product.minQty} | Step: {product.qtyStep}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-poppins text-2xl font-bold text-electric tabular-nums">
                      {item.quantity.toLocaleString()}
                    </span>
                    <span className="text-sm text-charcoal/40 ml-1">units</span>
                  </div>
                </div>

                {/* Slider-style range */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, -product.qtyStep)}
                    className="w-11 h-11 rounded-xl bg-ivory-100 hover:bg-ivory-200 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-charcoal/50" />
                  </button>

                  <div className="flex-1 relative h-11 flex items-center">
                    <div className="h-2 w-full bg-border/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-electric to-lavender rounded-full transition-all duration-300"
                        style={{
                          width: `${((item.quantity - product.minQty) / (product.maxQty - product.minQty)) * 100}%`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={product.minQty}
                      max={product.maxQty}
                      step={product.qtyStep}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, product.qtyStep)}
                    className="w-11 h-11 rounded-xl bg-ivory-100 hover:bg-ivory-200 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-charcoal/50" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Color */}
        <div className="mb-10">
          <h3 className="font-poppins text-lg font-semibold text-rich mb-4">Primary Brand Color</h3>
          <div className="flex flex-wrap gap-3">
            {brandColorOptions.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => onUpdate({ brandColor: color.hex })}
                className={`
                  group relative w-12 h-12 rounded-xl border-2 transition-all duration-300
                  ${data.brandColor === color.hex
                    ? 'border-electric scale-110 shadow-medium'
                    : 'border-transparent hover:scale-105'
                  }
                `}
                style={{
                  backgroundColor: color.hex === 'custom' ? '#f5f1e8' : color.hex,
                }}
                title={color.name}
              >
                {color.hex === 'custom' && (
                  <span className="text-xs font-bold text-charcoal/40">+</span>
                )}
                {data.brandColor === color.hex && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-electric flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          {data.brandColor && (
            <p className="mt-3 text-sm text-charcoal/40">
              Selected: {brandColorOptions.find((c) => c.hex === data.brandColor)?.name || 'Custom'}
            </p>
          )}
        </div>

        {/* Packaging */}
        <div>
          <h3 className="font-poppins text-lg font-semibold text-rich mb-4">Packaging Preference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packagingOptions.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => onUpdate({ packaging: pkg.id })}
                className={`
                  p-5 rounded-xl border text-left transition-all duration-300
                  ${data.packaging === pkg.id
                    ? 'border-electric bg-electric/[0.03]'
                    : 'border-border/30 bg-white hover:border-electric/20'
                  }
                `}
              >
                <span className={`font-poppins text-sm font-semibold block mb-1 ${data.packaging === pkg.id ? 'text-electric' : 'text-rich'}`}>
                  {pkg.name}
                </span>
                <span className="text-xs text-charcoal/45">{pkg.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
