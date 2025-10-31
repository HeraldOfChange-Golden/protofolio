/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.index.html",
    "./script/**/*.script.js",
    "./stylesheet/**/*.styles.css",
  ],
  theme: {
    extend: {
      colors: {
  'bg': '#0f1116',
  'card': '#12131a',
  'muted': '#9aa4bf',
  'accent': '#6b8aff',
  'glass': 'rgba(255,255,255,0.03)',
  'radius': '12px',
  'container': '1100px',
  'max-width': '1100px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}