'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── ATMOSPHERIC PARTICLE SYSTEM ─── */

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      phase: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(24, Math.floor(window.innerWidth / 60));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedY: -(Math.random() * 0.2 + 0.05),
          speedX: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.1 + 0.03,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let lastTime = 0;
    const animate = (time: number) => {
      // Throttle to ~30fps for subtle effect
      if (time - lastTime < 33) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.0005 + p.phase) * 0.08;
        p.opacity = 0.04 + Math.sin(time * 0.0003 + p.phase) * 0.03;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 124, 254, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animationId = requestAnimationFrame(animate);

    const onResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

/* ─── GLOW ORBS ─── */

function GlowOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary glow — slow, organic drift */}
      <motion.div
        className="absolute top-[20%] right-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(77, 124, 254, 0.06) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 16, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary warm glow */}
      <motion.div
        className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 184, 255, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -12, 0],
          y: [0, 16, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Subtle center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 241, 232, 0.4) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/* ─── NOISE TEXTURE OVERLAY ─── */

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.012]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }}
    />
  );
}

/* ─── GRADIENT OVERLAY FOR READABILITY ─── */

function ReadabilityOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left side vignette for text */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(245, 241, 232, 0.75) 0%, rgba(245, 241, 232, 0.35) 55%, transparent 100%)',
        }}
      />
      {/* Bottom fade for scroll transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(245, 241, 232, 1) 100%)',
        }}
      />
      {/* Top subtle fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(180deg, rgba(245, 241, 232, 0.4) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}

/* ─── MAIN EXPORT ─── */

export function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F5F1E8 0%, #FDFCF9 40%, #F5F1E8 70%, #EDE8FF 100%)',
        }}
      />

      {/* Atmospheric layers */}
      <GlowOrbs />
      <Particles />
      <NoiseOverlay />
      <ReadabilityOverlay />
    </div>
  );
}
