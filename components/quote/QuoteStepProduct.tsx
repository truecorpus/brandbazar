'use client';

import { motion } from 'framer-motion';
import { QuoteFormData } from '@/lib/quote/types';
import { quoteProducts } from '@/lib/quote/data';
import { easing, duration } from '@/lib/animations';
import { Coffee, Droplets, Briefcase, Shirt, BookOpen, Smartphone, Gift, Package, Check } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Coffee, Droplets, Briefcase, Shirt, BookOpen, Smartphone, Gift, Package,
};

interface QuoteStepProductProps {
  data: QuoteFormData;
  onUpdate: (data: Partial<QuoteFormData>) => void;
}

export function QuoteStepProduct({ data, onUpdate }: QuoteStepProductProps) {
  const toggleProduct = (productId: string) => {
    const exists = data.products.find((p) => p.productId === productId);
    if (exists) {
      onUpdate({
        products: data.products.filter((p) => p.productId !== productId),
      });
    } else {
      const product = quoteProducts.find((p) => p.id === productId);
      onUpdate({
        products: [...data.products, { productId, quantity: product?.defaultQty || 100 }],
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: duration.slow, ease: easing.cinematic }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">STEP 1 OF 5</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance mb-4">
            What are you creating?
          </h2>
          <p className="text-[17px] text-charcoal/50 max-w-[480px] mx-auto">
            Select one or more product categories for your branding project.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quoteProducts.map((product, i) => {
            const isSelected = data.products.some((p) => p.productId === product.id);
            const Icon = iconMap[product.icon] || Package;

            return (
              <motion.button
                key={product.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: easing.cinematic }}
                onClick={() => toggleProduct(product.id)}
                className={`
                  relative p-5 lg:p-6 rounded-2xl border text-left transition-all duration-500 group
                  ${isSelected
                    ? 'border-electric/40 bg-electric/[0.03] shadow-soft'
                    : 'border-border/30 bg-white hover:border-electric/20 hover:shadow-soft'
                  }
                `}
              >
                {/* Gradient bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-electric flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{
                      backgroundColor: isSelected ? `${product.accentColor}15` : '#f5f1e8',
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: isSelected ? product.accentColor : '#555555' }}
                    />
                  </div>

                  <h3 className="font-poppins text-sm lg:text-base font-semibold text-rich mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-charcoal/45 leading-relaxed">{product.description}</p>
                  <p className="text-xs text-charcoal/50 mt-1 font-medium">{product.priceRange}</p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, maxHeight: 0 }}
                      animate={{ opacity: 1, maxHeight: 500 }}
                      className="mt-3 pt-3 border-t border-electric/10 overflow-hidden"
                    >
                      <span className="text-xs text-electric font-semibold">
                        Min: {product.minQty} | Max: {product.maxQty.toLocaleString()}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected count */}
        {data.products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 text-electric text-sm font-medium">
              {data.products.length} {data.products.length === 1 ? 'product' : 'products'} selected
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
