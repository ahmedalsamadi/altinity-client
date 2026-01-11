/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0a192f',
        'charcoal': '#1e293b',
        'cyan': {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        'magenta': {
          400: '#f472b6',
          500: '#ec4899',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      'glow-pulse': {
        '0%, 100%': { 
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
        },
        '50%': { 
          boxShadow: '0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.5)',
        },
      },
    },
  },
  },
  plugins: [],
}
