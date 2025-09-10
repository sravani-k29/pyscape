/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EA5E9', // Sky blue color from the image
          dark: '#0284C7',
          light: '#38BDF8',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Purple color from the image
          dark: '#7C3AED',
          light: '#A78BFA',
        },
        dark: {
          DEFAULT: '#0F172A', // Dark background from the image
          lighter: '#1E293B',
          lightest: '#334155',
        },
        accent: {
          DEFAULT: '#F97316', // Orange accent from the image
          dark: '#EA580C',
          light: '#FB923C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
