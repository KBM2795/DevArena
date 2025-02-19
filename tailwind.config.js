/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        foreground: '#FAFAFA',
        primary: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#1F2937',
          foreground: '#E5E7EB',
        },
        muted: {
          DEFAULT: '#374151',
          foreground: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#4F46E5',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};