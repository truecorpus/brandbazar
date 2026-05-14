'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 30, stiffness: 150, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check touch on mount
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);
    const showCursor = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(77, 124, 254, 0.06) 0%, transparent 70%)',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
