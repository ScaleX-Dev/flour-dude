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
        button: '100px',
        card: '24px',
        cake: '32px',
        pill: '100px'
      },
      colors: {
        brand: {
          deepBrown: '#2a2725', // Deeper shade for high contrast text and strong grounds
          charcoal: '#666666', // Brand color base dark gray
          caramel: '#EABF71', // Brand color mustard/gold
          caramelLight: '#f5d9a1',
          cream: '#F3F3E9', // Brand off-white
          warmWhite: '#FFFFFF',
          sage: '#88B6B4', // Brand teal/mint
          rose: '#E3ACA7', // Brand soft rose
          textBody: '#403d39', // Dark highly legible body text
          textMuted: '#8a8581', 
          border: '#e6e4d9',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace']
      },
      boxShadow: {
        soft: '0 12px 30px -10px rgba(42, 39, 37, 0.06)',
        floating: '0 24px 50px -15px rgba(42, 39, 37, 0.12)'
      },
      keyframes: {
        'wa-pulse': {
          '0%, 88%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.55)' },
          '92%': { transform: 'scale(1.04)', boxShadow: '0 0 0 16px rgba(37, 211, 102, 0)' }
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
