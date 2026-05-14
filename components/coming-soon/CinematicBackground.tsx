'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ivory">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory-50 via-ivory to-ivory-200" />

      {/* Subtle dot texture */}
      <div className="absolute inset-0 texture-dots opacity-40" />

      {/* Floating orb 1 — lavender glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 184, 255, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '-10%',
          left: '-5%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb 2 — electric blue soft glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(77, 124, 254, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
          top: '20%',
          right: '-10%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb 3 — warm ivory glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 241, 232, 0.8) 0%, transparent 70%)',
          filter: 'blur(40px)',
          bottom: '10%',
          left: '30%',
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orb 4 — subtle lavender bottom right */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 184, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
          bottom: '-5%',
          right: '20%',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, -20, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft horizontal light streak */}
      <motion.div
        className="absolute h-[1px] w-[80vw] left-[10vw]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(77, 124, 254, 0.08), transparent)',
          top: '45%',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(17, 17, 17, 0.03) 100%)',
        }}
      />
    </div>
  );
}
