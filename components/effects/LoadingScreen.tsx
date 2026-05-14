'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  children: React.ReactNode;
}

export function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let loadFired = document.readyState === 'complete';
    let rafId: number;
    let completeTimeout: ReturnType<typeof setTimeout>;

    const start = performance.now();
    const maxDuration = 800;

    const finish = () => {
      if (!isMounted) return;
      setProgress(100);
      completeTimeout = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 100);
    };

    const tick = (now: number) => {
      if (!isMounted) return;
      const elapsed = now - start;
      const t = Math.min(elapsed / maxDuration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));

      if (loadFired || elapsed >= maxDuration) {
        finish();
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const handleLoad = () => {
      loadFired = true;
    };

    if (!loadFired) {
      window.addEventListener('load', handleLoad);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      clearTimeout(completeTimeout);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-ivory flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-2xl font-poppins font-bold text-rich tracking-tight">
                Brand<span className="text-electric">Bazar</span>
              </span>
            </motion.div>

            <div className="w-40 h-[1px] bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-electric"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.span
              className="mt-5 text-caption text-charcoal/50 tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {progress}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
