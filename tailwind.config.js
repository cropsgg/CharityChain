/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9ff',
          100: '#cdf3ff',
          200: '#9ae6ff',
          300: '#66daff',
          400: '#33cdff',
          500: '#00c0ff', // Primary neon blue
          600: '#009ac9',
          700: '#007394',
          800: '#004d62',
          900: '#002631',
        },
        secondary: {
          50: '#f5e6ff',
          100: '#ebcdff',
          200: '#d69aff',
          300: '#c266ff',
          400: '#ad33ff',
          500: '#9900ff', // Secondary neon purple
          600: '#7a00cc',
          700: '#5c0099',
          800: '#3d0066',
          900: '#1f0033',
        },
        accent: {
          50: '#e6fff5',
          100: '#ccffeb',
          200: '#99ffd6',
          300: '#66ffc2',
          400: '#33ffad',
          500: '#00ff99', // Accent neon green
          600: '#00cc7a',
          700: '#00995c',
          800: '#00663d',
          900: '#00331f',
        },
        // Neon colors
        'neon-blue': '#00e5ff',
        'neon-purple': '#b400ff',
        'neon-green': '#00ffa3',
        'neon-pink': '#ff00e5',
        // Background dark colors
        'bg-dark': '#080c1f',
        'bg-darker': '#040510',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'slideDown': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 