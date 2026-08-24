/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khaki: {
          DEFAULT: '#737F51',
          50: '#F5F7F0',
          100: '#E9EDE0',
          200: '#D4DCBE',
          300: '#B6C496',
          400: '#94A66C',
          500: '#737F51',
          600: '#5A643E',
          700: '#454C30',
          800: '#323724',
          900: '#212519',
        },
        redRobin: {
          DEFAULT: '#8C3B2B',
          50: '#FDF5F4',
          100: '#FBE8E5',
          200: '#F7D0C9',
          300: '#EEABA0',
          400: '#BD5743',
          500: '#8C3B2B',
          600: '#752F21',
          700: '#5D2419',
          800: '#461B12',
          900: '#2E110A',
        },
        jacobean: {
          DEFAULT: '#2C1810',
          50: '#F7F3F1',
          100: '#EDE3DF',
          200: '#D8C3BB',
          300: '#BD9B8E',
          400: '#7D5747',
          500: '#4D2F23',
          600: '#3D2319',
          700: '#2C1810',
          800: '#20110B',
          900: '#140A06',
        },
        oyster: {
          DEFAULT: '#D7CEBE',
          50: '#FAF9F6',
          100: '#F4F1EC',
          200: '#E8E2D6',
          300: '#D7CEBE',
          400: '#C2B5A0',
          500: '#A99981',
          600: '#8E7D66',
        },
        lace: {
          DEFAULT: '#FAF7F2',
          50: '#FFFFFF',
          100: '#FAF7F2',
          200: '#F4ECE0',
          300: '#EDE0CC',
        },
        pearlBush: {
          DEFAULT: '#EBE3D5',
          50: '#FCFAF7',
          100: '#F7F4EE',
          200: '#EBE3D5',
          300: '#DCB99E',
        },
        gold: {
          DEFAULT: '#C5A059',
          50: '#FDFBF5',
          100: '#F9F4E5',
          200: '#F2E4C2',
          300: '#E7CE97',
          400: '#D7B46F',
          500: '#C5A059',
          600: '#A6823F',
          700: '#81632D',
        }
      },
      fontFamily: {
        display: ['"Italiana"', '"Bodoni Moda"', 'Georgia', 'serif'],
        serif: ['"Bodoni Moda"', '"Libre Baskerville"', 'Georgia', 'serif'],
        bodySerif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        signature: ['"Pinyon Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"Syne"', 'sans-serif'],
        syne: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.3em',
        'wider-luxury': '0.2em',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
