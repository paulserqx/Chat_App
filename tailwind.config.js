/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBackground:'#404eed',
        buttonHover:'#5865f2',
        grey: '#313338',
        darkGrey: '#2B2D31',
        veryDarkGrey: '#111214'

      },
      boxShadow: {
        button: '0 8px 15px rgba(0,0,0,.2)'
      },
      animation: {
        popupOpen: 'popupOpen 0.4s ease-out',
        clouds: 'clouds 120s cubic-bezier(.38,.78,1,.81) infinite',
        loading: 'loading 1s cubic-bezier(.62,1,.59,.44) infinite'
      },
      keyframes: {
        popupOpen: {
          "0%": { transform: 'translateY(-100vh)' 
          },
         "100%": { transform: 'translateY(0vh)' 
          },
        },
        loading: {
          "0%": { transform: 'rotateZ(0deg) scale(1)' 
          },
          "50%": { transform: 'rotateZ(180deg) scale(1.5)' 
          },
         "100%": { transform: 'rotateZ(360deg) scale(1)' 
          },
        },
        clouds: {
          '0%': {transform: 'translateX(0%) scale(1.7)'},
          '100%': {transform: 'translateX(100%) scale(2.2)'},
        }
      }
    },
  },
  plugins: [],
}
