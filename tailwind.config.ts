import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        button: '100px', // Soft, modern pill shape for all primary actions
        card: '16px', // Elegant, smooth corners for imagery and product cards
        cake: '20px',
        pill: '100px'
      },
      colors: {
        // High-class, minimalistic boutique palette
        brown: {
          deep: '#1A1614', // Almost black, much sharper and more modern for contrast
          mid: '#4A3B32'
        },
        caramel: {
          DEFAULT: '#D4A373', // Softer, more elegant gold/caramel accent
          light: '#E6CCB8'
        },
        cream: '#FDFBF7', // Ultra-clean, slightly warm off-white (like Crumbl/editorial sites)
        warmWhite: '#FFFFFF', // Pure white for stark contrast areas
        sage: '#A3B19B',
        rose: '#E2B4A7',
        textBody: '#2A2421', // Dark charcoal for high legibility, not pure black
        textMuted: '#8A817C',
        borderColor: '#EAE4DD', // Very subtle borders
        wa: '#25D366',
        brand: {
          deepBrown: '#1A1614',
          caramel: '#D4A373',
          caramelLight: '#E6CCB8',
          cream: '#FDFBF7',
          warmWhite: '#FFFFFF',
          sage: '#A3B19B',
          rose: '#E2B4A7',
          textBody: '#2A2421',
          textMuted: '#8A817C',
          border: '#EAE4DD'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'], // Elegant serif
        sans: ['DM Sans', 'sans-serif'], // Clean modern geometric
        mono: ['DM Mono', 'monospace']
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(26, 22, 20, 0.08)', // High-class floating shadow
        'floating': '0 20px 40px -20px rgba(26, 22, 20, 0.12)'
      },
      keyframes: {
        'wa-pulse': {
          '0%, 88%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55)'
          },
          '92%': {
            transform: 'scale(1.04)',
            boxShadow: '0 0 0 16px rgba(37, 211, 102, 0)'
          }
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'wa-pulse': 'wa-pulse 3s ease-in-out infinite',
        'rise-in': 'rise-in 700ms ease-out both'
      }
    }
  },
  plugins: []
};

export default config;
