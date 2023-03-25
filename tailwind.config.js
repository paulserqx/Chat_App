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
        popupOpen: 'popupOpen 0.2s ease-in',
        loading: 'loading 1s cubic-bezier(.62,1,.59,.44) infinite'
      },
      keyframes: {
        popupOpen: {
          "0%": { transform: 'scale(0)' 
          },
         "100%": { transform: 'scale(1)' 
          },
        },
        loading: {
          "0%": { transform: 'rotateZ(0deg) scale(1)' 
          },
          "50%": { transform: 'rotateZ(180deg) scale(1.5)' 
          },
         "100%": { transform: 'rotateZ(360deg) scale(1)' 
          },
        }
      }
    },
  },
  plugins: [],
}
