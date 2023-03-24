/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBackground:'#404eed',
        buttonHover:'#5865f2'
      },
      boxShadow: {
        button: '0 8px 15px rgba(0,0,0,.2)'
      }
      
    },
  },
  plugins: [],
}
