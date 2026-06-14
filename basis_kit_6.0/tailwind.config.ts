/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     BASIS KIT - DESIGN SYSTEM FRAMEWORK                   ║
 * ║                     Neo-Brutalismo Técnico + Gamut Accents                ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Version: 1.0.0                                                           ║
 * ║  Ecosystem: Grupo MARTE / MSICCA - Proyecto PANTEON                       ║
 * ║  Technologies: PHP 8.1+, Tailwind CSS 3.4, Hotwire Turbo 7.3              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Este archivo es el motor del BASIS Kit. Define todos los Design Tokens
 * que garantizan consistencia visual en las 14 plataformas del ecosistema.
 * 
 * REGLA DE ORO: Prohibido el uso de clases de color hardcoded en componentes.
 * Siempre usar alias semánticos (bg-brand-primary, text-brand-primary).
 */

import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════════
      // SECTION: TYPOGRAPHY - IBM Plex Mono (Technical) + Inter (Body)
      // ═══════════════════════════════════════════════════════════════════════
      fontFamily: {
        'mono': ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // MSICCA BRAND TYPOGRAPHY - Fully Defined
        'msicca-heading': ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        'msicca-body': ['Lato', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'micro': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.05em' }],
        'data': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // SECTION: BASIS BRAND COLORS - MSICCA Core Palette
      // ═══════════════════════════════════════════════════════════════════════
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // BASIS BRAND COLORS - Semantic Aliases
        brand: {
          primary: 'var(--color-brand-primary)',
          'primary-rgb': 'var(--color-brand-primary-rgb)',
          'primary-dark': 'var(--color-brand-primary-dark)',
          // MSICCA Core Colors (Fully Defined)
          msicca: {
            orange: '#C93400',
            blue: '#0095C9',
            'orange-light': '#FF784A',
            'blue-light': '#4AD0FF',
          },
          brutal: '#000000',
        },
        
        // APP-SPECIFIC ACCENT COLORS (Module Branding)
        // NOTE: Only MSICCA colors are fully defined. Other modules are in development.
        app: {
          nexus: {
            DEFAULT: '#2980B9',
            dark: '#22679c',
            rgb: '41, 128, 185',
          },
          operand: {
            DEFAULT: '#27AE60',
            dark: '#21924f',
            rgb: '39, 174, 96',
          },
          vector: {
            DEFAULT: '#3498DB',
            dark: '#297bb0',
            rgb: '52, 152, 219',
          },
          codex: {
            DEFAULT: '#7F8C8D',
            dark: '#687273',
            rgb: '127, 140, 141',
          },
          axis: {
            DEFAULT: '#E67E22',
            dark: '#bf661d',
            rgb: '230, 126, 34',
          },
          synapse: {
            DEFAULT: '#FF6F00',
            dark: '#cc5900',
            rgb: '255, 111, 0',
          },
        },
        
        // GRAYSCALE - Dark Mode Premium
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          750: '#363636',
          800: '#262626',
          850: '#1a1a1a',
          900: '#171717',
          950: '#0A0A0A',
        },
        
        // STATE COLORS (Fixed - Do not use brand variables)
        state: {
          success: {
            DEFAULT: '#10B981',
            light: '#34D399',
            dark: '#059669',
          },
          warning: {
            DEFAULT: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
          },
          error: {
            DEFAULT: '#EF4444',
            light: '#F87171',
            dark: '#DC2626',
          },
          info: {
            DEFAULT: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
          },
        },
        
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },

      // NEO-BRUTALISM - Borders & Shadows
      borderWidth: {
        'brutal': '2px',
        'brutal-lg': '3px',
      },
      
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-xl': '8px 8px 0px 0px #000000',
        'brutal-brand': '4px 4px 0px 0px var(--color-brand-primary)',
        'brutal-brand-sm': '2px 2px 0px 0px var(--color-brand-primary)',
        'brutal-hover': '2px 2px 0px 0px #000000',
        'brutal-active': '0px 0px 0px 0px #000000',
        'brutal-inset': 'inset 2px 2px 0px 0px rgba(0, 0, 0, 0.15)',
      },
      
      borderRadius: {
        'none': '0px',
        'brutal': '0px',
        'soft': '4px',
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      
      animation: {
        'stripe-slide': 'stripe-slide 1s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'border-flash': 'border-flash 0.3s ease-out',
      },
      
      keyframes: {
        'stripe-slide': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '32px 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'border-flash': {
          '0%': { borderColor: 'var(--color-brand-primary)' },
          '100%': { borderColor: 'transparent' },
        },
      },

      // BACKGROUNDS - Gamut Textures (20% opacity, wider spacing)
      backgroundImage: {
        'stripes': 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.2) 8px, rgba(0, 0, 0, 0.2) 16px)',
        'stripes-light': 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255, 255, 255, 0.06) 8px, rgba(255, 255, 255, 0.06) 16px)',
        'stripes-brand': 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(var(--color-brand-primary-rgb), 0.2) 8px, rgba(var(--color-brand-primary-rgb), 0.2) 16px)',
        'grid-pattern': 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
        'grid-pattern-light': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      
      backgroundSize: {
        'stripes': '32px 32px',
        'grid': '20px 20px',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  
  plugins: [
    tailwindcssAnimate,
    plugin(function({ addUtilities, addComponents, addBase }) {
      // BASE: CSS Variables for Brand Colors
      addBase({
        ':root': {
          '--color-brand-primary': '#C93400',
          '--color-brand-primary-rgb': '201, 52, 0',
          '--color-brand-primary-dark': '#A02900',
        },
        '.module-nexus': {
          '--color-brand-primary': '#2980B9',
          '--color-brand-primary-rgb': '41, 128, 185',
          '--color-brand-primary-dark': '#22679c',
        },
        '.module-operand': {
          '--color-brand-primary': '#27AE60',
          '--color-brand-primary-rgb': '39, 174, 96',
          '--color-brand-primary-dark': '#21924f',
        },
        '.module-vector': {
          '--color-brand-primary': '#3498DB',
          '--color-brand-primary-rgb': '52, 152, 219',
          '--color-brand-primary-dark': '#297bb0',
        },
        '.module-codex': {
          '--color-brand-primary': '#7F8C8D',
          '--color-brand-primary-rgb': '127, 140, 141',
          '--color-brand-primary-dark': '#687273',
        },
        '.module-axis': {
          '--color-brand-primary': '#E67E22',
          '--color-brand-primary-rgb': '230, 126, 34',
          '--color-brand-primary-dark': '#bf661d',
        },
        '.module-synapse': {
          '--color-brand-primary': '#FF6F00',
          '--color-brand-primary-rgb': '255, 111, 0',
          '--color-brand-primary-dark': '#cc5900',
        },
        '.module-core': {
          '--color-brand-primary': '#27AE60',
          '--color-brand-primary-rgb': '39, 174, 96',
          '--color-brand-primary-dark': '#21924f',
        },
      });
      
      // UTILITIES: Brand Color Helpers
      addUtilities({
        '.bg-brand-primary': {
          'background-color': 'var(--color-brand-primary)',
        },
        '.bg-brand-primary\\/10': {
          'background-color': 'rgba(var(--color-brand-primary-rgb), 0.1)',
        },
        '.bg-brand-primary\\/20': {
          'background-color': 'rgba(var(--color-brand-primary-rgb), 0.2)',
        },
        '.bg-brand-primary\\/30': {
          'background-color': 'rgba(var(--color-brand-primary-rgb), 0.3)',
        },
        '.text-brand-primary': {
          'color': 'var(--color-brand-primary)',
        },
        '.border-brand-primary': {
          'border-color': 'var(--color-brand-primary)',
        },
        '.ring-brand-primary': {
          '--tw-ring-color': 'var(--color-brand-primary)',
        },
        '.hover\\:bg-brand-primary-dark:hover': {
          'background-color': 'var(--color-brand-primary-dark)',
        },
      });
      
      // COMPONENTS: BASIS Core Components
      addComponents({
        '.basis-card': {
          'background-color': 'var(--card)',
          'border': '2px solid #000000',
          'border-radius': '0px',
          'box-shadow': '4px 4px 0px 0px #000000',
          'transition': 'all 150ms ease-out',
          '&:hover': {
            'box-shadow': '2px 2px 0px 0px #000000',
            'transform': 'translate(2px, 2px)',
          },
        },
        '.dark .basis-card': {
          'border-color': 'rgba(255, 255, 255, 0.2)',
          'box-shadow': '4px 4px 0px 0px rgba(0, 0, 0, 0.5)',
        },
        '.basis-input': {
          'background-color': 'var(--card)',
          'border': '2px solid #000000',
          'border-radius': '0px',
          'padding': '0.5rem 0.75rem',
          'font-family': "'IBM Plex Mono', monospace",
          'font-size': '1rem',
          'transition': 'all 150ms ease-out',
          '&:focus': {
            'outline': 'none',
            'border-color': 'var(--color-brand-primary)',
            'box-shadow': '0 0 0 3px rgba(var(--color-brand-primary-rgb), 0.2)',
          },
        },
        '.basis-btn': {
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'padding': '0.5rem 1rem',
          'font-family': "'IBM Plex Mono', monospace",
          'font-weight': '600',
          'font-size': '0.875rem',
          'text-transform': 'uppercase',
          'letter-spacing': '0.05em',
          'border': '2px solid #000000',
          'border-radius': '0px',
          'box-shadow': '4px 4px 0px 0px #000000',
          'transition': 'all 150ms ease-out',
          'cursor': 'pointer',
          '&:hover': {
            'box-shadow': '2px 2px 0px 0px #000000',
            'transform': 'translate(2px, 2px)',
          },
          '&:active': {
            'box-shadow': '0px 0px 0px 0px #000000',
            'transform': 'translate(4px, 4px)',
          },
        },
        '.basis-btn-primary': {
          'background-color': 'var(--color-brand-primary)',
          'color': '#ffffff',
          '&:hover': {
            'background-color': 'var(--color-brand-primary-dark)',
          },
        },
        '.basis-btn-secondary': {
          'background-color': 'transparent',
          'color': 'var(--foreground)',
          '&:hover': {
            'background-color': 'rgba(0, 0, 0, 0.05)',
          },
        },
        '.basis-skeleton': {
          'background-color': 'var(--muted)',
          'background-image': 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(var(--color-brand-primary-rgb), 0.2) 8px, rgba(var(--color-brand-primary-rgb), 0.2) 16px)',
          'background-size': '32px 32px',
          'animation': 'stripe-slide 1s linear infinite',
          'border-radius': '0px',
        },
        '.basis-badge': {
          'display': 'inline-flex',
          'align-items': 'center',
          'padding': '0.125rem 0.5rem',
          'font-family': "'IBM Plex Mono', monospace",
          'font-size': '0.75rem',
          'font-weight': '500',
          'text-transform': 'uppercase',
          'letter-spacing': '0.05em',
          'border': '1px solid',
          'border-radius': '0px',
        },
        '.basis-section-header': {
          'position': 'relative',
          'padding-left': '1rem',
          'font-family': "'IBM Plex Mono', monospace",
          'font-weight': '700',
          'text-transform': 'uppercase',
          'letter-spacing': '0.1em',
          '&::before': {
            'content': '"▸"',
            'position': 'absolute',
            'left': '0',
            'color': 'var(--color-brand-primary)',
          },
        },
      });
    }),
  ],
};

export default config;
