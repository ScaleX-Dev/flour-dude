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
          deepBrown: '#2C1A0E', // Rich warm dark brown — headers, dark sections
          charcoal: '#666666',
          caramel: '#C8813A', // True caramel-brown — primary CTAs, accents
          caramelLight: '#E8A85A', // Hover & sub-accents
          cream: '#FAF6EE', // Warm page background
          warmWhite: '#FFFDF8', // Card surfaces
          sage: '#7A8C6E', // Artisan sage green — secondary accents
          rose: '#D4907A', // Warm rose — B2B sections
          textBody: '#3A2A1E', // Warm body text
          textMuted: '#7A6A5E', // Muted/secondary text
          border: '#E8DDD0', // Warm border
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
