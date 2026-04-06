import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FFF6E9',
          caramel: '#D9A86A',
          cocoa: '#4B2E2A',
          sage: '#A6B89A'
        }
      }
    }
  },
  plugins: []
};

export default config;
