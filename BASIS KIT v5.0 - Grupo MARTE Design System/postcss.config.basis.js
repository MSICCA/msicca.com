/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BASIS KIT v5.0 - PostCSS Configuration
 * Grupo MARTE Design System
 * 
 * PostCSS configuration for processing BASIS KIT styles
 * ═══════════════════════════════════════════════════════════════════════════
 */

module.exports = {
  plugins: {
    // Tailwind CSS v4 integration
    '@tailwindcss/postcss': {},
    
    // Autoprefixer for vendor prefixes
    autoprefixer: {
      flexbox: true,
      grid: true,
    },
    
    // CSS Nano for production minification (optional)
    // 'cssnano': {
    //   preset: ['default', {
    //     discardComments: { removeAll: true },
    //     normalizeWhitespace: true,
    //   }]
    // },
  },
};
