import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        button: '8px',
        card: '12px',
        pill: '100px'
      },
      colors: {
        brand: {
          deepBrown: '#2C1A0E',
          caramel: '#C8813A',
          caramelLight: '#E8A85A',
          cream: '#FAF6EE',
          warmWhite: '#FFFDF8',
          sage: '#7A8C6E',
          rose: '#D4907A',
          textBody: '#3A2A1E',
          textMuted: '#7A6A5E',
          border: '#E8DDD0'
        }
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        display: ['var(--font-playfair)'],
        mono: ['var(--font-dm-mono)']
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
