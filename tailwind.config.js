/* eslint-disable  */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
};
