/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        screens:{
          xs:"375px",
          sm:"576px",
          md:"768px",
          lg:"992px",
          xl:"1200px",
          "2xl":"1400px"
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors:{
      'fogGray' :'#676c7d',
      'sapphireBlue' :'#754FFE',
      'white': '#ffffff',
      'white-3':'#F5F5F5',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
