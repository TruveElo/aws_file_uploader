/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'secondary': '#64748B', // Sophisticated slate (secondary) - slate-500
        'accent': '#0EA5E9', // Lighter blue (accent) - sky-500
        'background': '#FAFAFA', // Warm off-white (background) - gray-50
        'surface': '#FFFFFF', // Pure white (surface) - white
        'text-primary': '#1E293B', // Rich charcoal (text primary) - slate-800
        'text-secondary': '#64748B', // Matching secondary (text secondary) - slate-500
        'success': '#059669', // Forest green (success) - emerald-600
        'warning': '#D97706', // Amber orange (warning) - amber-600
        'error': '#DC2626', // Clear red (error) - red-600
        'border': 'rgba(148, 163, 184, 0.2)', // Subtle border - slate-400 with opacity
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: {
        'header': '100',
        'overlay': '1000',
      }
    },
  },
  plugins: [],
}