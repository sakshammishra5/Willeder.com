/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        'noto-sans-jp': ['"Noto Sans JP"', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
      },
      fontSize: {
        'tiny': '16px',   
        'huge': '4rem',      
      },
       lineHeight: {
        'extra-compact': '1.25', 
      },
       screens: {
        'sm': '600px', 
      },
    },
  },
  plugins: [],
}