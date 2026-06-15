/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BASIS KIT v5.0 - Tailwind CSS Configuration
 * Grupo MARTE Design System
 * Neo-Brutalismo Técnico + Gamut Accents
 * 
 * Complete configuration for Tailwind CSS v4
 * 75+ Components | 15 Properties | Engineering Data | Technical Charts
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // ═════════════════════════════════════════════════════════════════════
      // COLORS - MSICCA Dual Primary System
      // ═════════════════════════════════════════════════════════════════════
      colors: {
        // Brand Primary Colors (MSICCA Dual System)
        brand: {
          DEFAULT: 'var(--brand, #C93400)',
          primary: 'var(--brand, #C93400)',
          secondary: 'var(--brand-secondary, #0095C9)',
          accent: {
            1: '#FF784A',
            2: '#4DB8D8',
          },
        },
        
        // Ecosystem Platforms (15 Properties)
        ecosystem: {
          // Central Hub
          msicca: '#C93400',
          'msicca-secondary': '#0095C9',
          visual: '#6366F1',
          dev: '#059669',
          
          // Corporate Applications
          nexus: '#2980B9',
          operand: '#27AE60',
          vector: '#3498DB',
          codex: '#7F8C8D',
          axis: '#E67E22',
          synapse: '#8B5CF6',
          
          // Creative & Knowledge
          creador: '#8B5CF6',
          sabio: '#06B6D4',
          atlas: '#EC4899',
          
          // Core & Admin
          'basis-core': '#27AE60',
          
          // Blog Network
          'ing-marval': '#0F766E',
          marval: '#7C3AED',
          suinmaca: '#B45309',
          smilelovers: '#DB2777',
          'marte-group': '#1A1A2E',
          spuntini: '#B91C1C',
        },
        
        // Semantic Colors
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        
        // Neutral Scale
        neutral: {
          50: '#FAFAFA',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0A0A0A',
        },
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // TYPOGRAPHY
      // ═════════════════════════════════════════════════════════════════════
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        marketing: ['Montserrat', 'sans-serif'],
      },
      
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.2' }],
        'xs': ['12px', { lineHeight: '1.4' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.625' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.25' }],
        '5xl': ['48px', { lineHeight: '1.2' }],
        '6xl': ['60px', { lineHeight: '1.15' }],
        '7xl': ['72px', { lineHeight: '1.1' }],
        '8xl': ['96px', { lineHeight: '1.05' }],
        '9xl': ['128px', { lineHeight: '1' }],
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // SPACING - 8px Grid System
      // ═════════════════════════════════════════════════════════════════════
      spacing: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // BORDER RADIUS - Brutal (No curves)
      // ═════════════════════════════════════════════════════════════════════
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '0px',
        'md': '4px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // BOX SHADOWS - Brutal System
      // ═════════════════════════════════════════════════════════════════════
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px var(--shadow-color, #000)',
        'brutal': '4px 4px 0px 0px var(--shadow-color, #000)',
        'brutal-lg': '6px 6px 0px 0px var(--shadow-color, #000)',
        'brutal-xl': '8px 8px 0px 0px var(--shadow-color, #000)',
        'brutal-brand': '4px 4px 0px 0px var(--brand, #C93400)',
        'brutal-secondary': '4px 4px 0px 0px var(--brand-secondary, #0095C9)',
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // ANIMATIONS
      // ═════════════════════════════════════════════════════════════════════
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'skeleton': 'skeleton-pulse 1.5s ease-in-out infinite',
      },
      
      keyframes: {
        'skeleton-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // TRANSITIONS
      // ═════════════════════════════════════════════════════════════════════
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      
      // ═════════════════════════════════════════════════════════════════════
      // Z-INDEX
      // ═════════════════════════════════════════════════════════════════════
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  
  plugins: [],
};

export default config;
