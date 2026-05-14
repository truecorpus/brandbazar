'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Progress track */}
      <div className="h-[2px] bg-transparent">
        {/* Progress fill with glow */}
        <motion.div
          className="h-full bg-electric origin-left"
          style={{ scaleX }}
        />
        <motion.div
          className="h-full bg-electric/30 blur-sm origin-left -mt-[2px]"
          style={{ scaleX }}
        />
      </div>

      {/* Percentage pill — appears after scrolling */}
      <motion.div
        className="absolute top-4 right-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: progress > 8 ? 1 : 0,
          y: progress > 8 ? 0 : -10,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-border/40 shadow-soft">
          <span className="text-xs font-semibold text-charcoal/60 tracking-wide tabular-nums uppercase">
            {progress}% read
          </span>
        </div>
      </motion.div>
    </div>
  );
}
