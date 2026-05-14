'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { formatCompactNumber } from '@/lib/utils';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  formatCompact?: boolean;
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
  formatCompact = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      
      setCount(current);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  const displayValue = formatCompact ? formatCompactNumber(count) : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
