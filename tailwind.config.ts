import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ─────────── COLOR SYSTEM ─────────── */
      colors: {
        ivory: {
          DEFAULT: '#F5F1E8',
          50: '#FDFCF9',
          100: '#F5F1E8',
          200: '#E7E1D7',
          300: '#D5CDBF',
          400: '#C4B9A7',
        },
        electric: {
          DEFAULT: '#4D7CFE',
          50: '#EEF2FF',
          100: '#DCE5FF',
          200: '#B8CBFF',
          300: '#8AABFF',
          400: '#6B93FF',
          500: '#4D7CFE',
          600: '#2E62E8',
          700: '#1E4EC2',
          800: '#1A3F9E',
          900: '#1A367D',
        },
        rich: {
          DEFAULT: '#111111',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#555555',
          600: '#333333',
          700: '#222222',
          800: '#1A1A1A',
          900: '#111111',
        },
        charcoal: '#555555',
        lavender: {
          DEFAULT: '#C9B8FF',
          50: '#F5F2FF',
          100: '#EDE8FF',
          200: '#C9B8FF',
          300: '#A085F5',
        },
        surface: '#FFFFFF',
        border: '#E7E1D7',
      },

      /* ─────────── TYPOGRAPHY ─────────── */
      fontFamily: {
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        general: ['General Sans', 'Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6.5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'h2': ['clamp(1.625rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        'h4': ['clamp(1.0625rem, 1.5vw, 1.125rem)', { lineHeight: '1.4', letterSpacing: '0' }],
        'body-lg': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },

      /* ─────────── SPACING ─────────── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'container': '1280px',
        'container-lg': '1400px',
      },

      /* ─────────── RADIUS ─────────── */
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '4xl': '2rem',
        'pill': '9999px',
      },

      /* ─────────── SHADOWS ─────────── */
      boxShadow: {
        'soft': '0 4px 24px rgba(0, 0, 0, 0.04)',
        'medium': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'strong': '0 16px 48px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 40px rgba(77, 124, 254, 0.12)',
        'glow-strong': '0 0 60px rgba(77, 124, 254, 0.2)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
      },

      /* ─────────── KEYFRAMES ─────────── */
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-scale': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(77, 124, 254, 0.15)' },
          '50%': { boxShadow: '0 0 36px rgba(77, 124, 254, 0.28)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.015)', opacity: '0.92' },
        },
      },

      /* ─────────── ANIMATIONS ─────────── */
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-scale': 'fade-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
      },

      /* ─────────── EASING ─────────── */
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'decel': 'cubic-bezier(0, 0, 0.2, 1)',
        'exit': 'cubic-bezier(0.4, 0, 1, 1)',
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      /* ─────────── DURATIONS ─────────── */
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },

      /* ─────────── BREAKPOINTS ─────────── */
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
