/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
