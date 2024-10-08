import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        alternate: 'var(--alternate)',
        inverse: 'var(--inverse)',
      },
      fontFamily: {
        coustard: 'var(--font-coustard)',
        montserrat: 'var(--font-montserrat)',
      },
    },
  },
  plugins: [],
};
export default config;
