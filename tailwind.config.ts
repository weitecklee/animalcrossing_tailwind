import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
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
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1400px',
      '2xl': '1600px',
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
