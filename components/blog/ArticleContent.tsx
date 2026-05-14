'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArticleBlock } from '@/lib/blog/types';
import { easing, duration } from '@/lib/animations';

interface ArticleContentProps {
  blocks: ArticleBlock[];
}

const blockVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing.cinematic },
  },
};

export function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <div className="space-y-10 lg:space-y-14">
      {blocks.map((block, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={blockVariants}
        >
          <BlockRenderer block={block} index={index} />
        </motion.div>
      ))}
    </div>
  );
}

function BlockRenderer({ block, index }: { block: ArticleBlock; index: number }) {
  switch (block.type) {
    case 'paragraph':
      // First paragraph gets drop cap treatment
      if (index === 0) {
        return <DropCapParagraph content={block.content || ''} />;
      }
      return (
        <p className="text-[17px] lg:text-[18px] text-charcoal/80 leading-[1.85] max-w-[65ch] font-jakarta">
          {block.content}
        </p>
      );

    case 'heading':
      return (
        <h2 className="font-poppins text-[28px] lg:text-[36px] font-semibold text-rich mt-16 lg:mt-20 mb-6 lg:mb-8 leading-[1.15] tracking-[-0.02em] text-wrap-balance">
          {block.content}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="font-poppins text-[20px] lg:text-[24px] font-semibold text-rich mt-12 lg:mt-14 mb-4 lg:mb-5 leading-[1.25] tracking-[-0.01em] text-wrap-balance">
          {block.content}
        </h3>
      );

    case 'quote':
      return (
        <figure className="relative my-14 lg:my-20 max-w-[65ch]">
          {/* Decorative top accent */}
          <div className="absolute -top-3 left-0 w-16 h-[2px] bg-gradient-to-r from-electric to-lavender" />
          
          {/* Large quotation mark */}
          <div className="absolute -top-6 -left-2 lg:-left-4 text-[120px] lg:text-[160px] font-poppins text-electric/[0.06] leading-none select-none pointer-events-none">
            &ldquo;
          </div>
          
          <blockquote className="relative pl-6 lg:pl-8">
            <p className="text-[22px] lg:text-[28px] font-poppins font-medium text-rich leading-[1.4] tracking-[-0.01em] text-wrap-balance">
              {block.content}
            </p>
            {block.caption && (
              <figcaption className="mt-5 lg:mt-6 flex items-center gap-3">
                <span className="w-8 h-px bg-charcoal/20" />
                <cite className="text-sm text-charcoal/50 not-italic font-medium">
                  {block.caption}
                </cite>
              </figcaption>
            )}
          </blockquote>
        </figure>
      );

    case 'pullQuote':
      return (
        <div className="my-14 lg:my-20 relative">
          {/* Background with subtle texture */}
          <div className="relative py-12 lg:py-16 px-8 lg:px-14 bg-rich rounded-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-6 right-8 text-[100px] font-poppins text-white/[0.03] leading-none select-none">
              &rdquo;
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-electric via-lavender to-electric/50" />
            
            <p className="relative text-[20px] lg:text-[26px] font-poppins font-medium text-white/95 leading-[1.45] tracking-[-0.01em] text-wrap-balance">
              {block.content}
            </p>
          </div>
        </div>
      );

    case 'bulletList':
      return (
        <ul className="space-y-4 max-w-[65ch]">
          {block.items?.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: easing.cinematic }}
              className="flex gap-4 text-[17px] lg:text-[18px] text-charcoal/80 leading-[1.75]"
            >
              <span className="mt-[11px] w-[6px] h-[6px] rounded-full bg-electric flex-shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      );

    case 'numberedList':
      return (
        <ol className="space-y-5 max-w-[65ch]">
          {block.items?.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: easing.cinematic }}
              className="flex gap-5 text-[17px] lg:text-[18px] text-charcoal/80 leading-[1.75]"
            >
              <span className="mt-0.5 w-9 h-9 rounded-full bg-electric/8 text-electric flex items-center justify-center text-[13px] font-bold flex-shrink-0 font-poppins">
                {i + 1}
              </span>
              <span className="pt-1">{item}</span>
            </motion.li>
          ))}
        </ol>
      );

    case 'highlightBox':
      return (
        <div className="my-12 lg:my-16 relative max-w-[65ch]">
          <div className="relative p-8 lg:p-10 bg-gradient-to-br from-electric/[0.04] via-lavender/[0.03] to-transparent border border-electric/10 rounded-2xl">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
            
            <p className="text-[18px] lg:text-[20px] text-rich font-medium leading-[1.6] text-wrap-balance">
              {block.content}
            </p>
          </div>
        </div>
      );

    case 'insightBox':
      return (
        <div className="my-12 lg:my-16 max-w-[65ch]">
          <div className="p-8 lg:p-10 bg-white rounded-2xl border border-border/50 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-electric" />
              <span className="text-caption text-electric font-semibold tracking-wider">KEY INSIGHT</span>
            </div>
            <p className="text-[18px] lg:text-[20px] text-rich leading-[1.6] font-medium text-wrap-balance">
              {block.content}
            </p>
          </div>
        </div>
      );

    case 'statRow':
      return (
        <div className="my-14 lg:my-20 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-[65ch]">
          {block.stats?.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: easing.cinematic }}
              className="relative text-center p-7 lg:p-8 bg-white rounded-2xl border border-border/40 group hover:border-electric/20 hover:shadow-medium transition-all duration-500"
            >
              <AnimatedStat value={stat.value} />
              <div className="text-sm text-charcoal/55 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      );

    case 'bigStat':
      return (
        <div className="my-16 lg:my-24 max-w-[65ch] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easing.cinematic }}
          >
            <div className="font-poppins text-[72px] lg:text-[96px] font-bold text-electric leading-none tracking-[-0.03em]">
              {block.content}
            </div>
            {block.caption && (
              <p className="mt-4 text-[18px] text-charcoal/60 font-medium">{block.caption}</p>
            )}
          </motion.div>
        </div>
      );

    case 'image':
      return (
        <figure className="my-12 lg:my-16 max-w-[65ch]">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-ivory-200 to-ivory-100">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-lavender/5" />
            <div className="absolute inset-0 texture-dots opacity-[0.04]" />
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-electric/10 to-lavender/10 flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-electric/20" />
                </div>
                <span className="text-caption text-charcoal/30">Visual Story</span>
              </div>
            </div>
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-center text-sm text-charcoal/40">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'divider':
      return (
        <div className="my-14 lg:my-16 flex items-center justify-center max-w-[65ch]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-electric/40" />
            <div className="w-12 h-px bg-border" />
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─── Drop Cap First Paragraph ───
function DropCapParagraph({ content }: { content: string }) {
  const firstChar = content.charAt(0);
  const rest = content.slice(1);

  return (
    <p className="text-[18px] lg:text-[19px] text-charcoal/80 leading-[1.85] max-w-[65ch] font-jakarta">
      <span className="float-left text-[72px] lg:text-[88px] font-poppins font-bold text-rich leading-[0.75] mr-3 mt-1">
        {firstChar}
      </span>
      {rest}
    </p>
  );
}

// ─── Animated Stat Counter ───
function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric portion
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numericMatch[0].replace(/,/g, ''), 10);
    const prefix = value.substring(0, value.indexOf(numericMatch[0]));
    const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length);

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNum * eased);
      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-poppins text-[36px] lg:text-[44px] font-bold text-electric leading-none tracking-[-0.02em]">
      {displayValue}
    </div>
  );
}
