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
      },
      animation: {
        popupOpen: 'popupOpen 0.5s cubic-bezier(.02,1.28,.82,.81)'
      },
      keyframes: {
        popupOpen: {
          "0%": { transform: 'scale(0)' , borderRadius: '50%'
         },
         "100%": { transform: 'scale(1)' , borderRadius: '0%'
        },
        }
      }
    },
  },
  plugins: [],
}
