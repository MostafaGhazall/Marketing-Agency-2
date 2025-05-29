/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",   // adjust to your stack
  ],
  theme: {
    extend: {
      colors: {
        /* you can now write bg-primary-light, text-secondary-orange … */
        "primary-light":   "var(--primary-light)",
        "primary-neutral": "var(--primary-neutral)",
        "primary-dark":    "var(--primary-dark)",
        "primary-black":   "var(--primary-black)",

        "secondary-orange":"var(--secondary-orange)",
        "secondary-cream": "var(--secondary-cream)",
        "secondary-olive": "var(--secondary-olive)",
        "secondary-white": "var(--secondary-white)",
      },
      fontFamily: {
        plex:      ['var(--font-plex)'],
        'plex-ar': ['var(--font-plex-arabic)'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
