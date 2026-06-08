/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#e81d63', light: '#ff6b99', soft: '#fff1f5' },
        surface: '#faf8f9',
        ink:     '#1c1017',
        mid:     '#4a3540',
        subtle:  '#8c7480',
        line:    '#f0eaed',
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        body:    ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        sm:   '0 1px 3px rgba(28,16,23,0.06)',
        md:   '0 4px 16px rgba(28,16,23,0.08)',
        lg:   '0 12px 40px rgba(28,16,23,0.10)',
        xl:   '0 20px 60px rgba(28,16,23,0.12)',
        pink: '0 6px 24px rgba(232,29,99,0.25)',
      },
      keyframes: {
        fadeUp:    { from:{opacity:'0',transform:'translateY(24px)'},to:{opacity:'1',transform:'translateY(0)'} },
        fadeIn:    { from:{opacity:'0'},to:{opacity:'1'} },
        scaleIn:   { '0%':{transform:'scale(0)',opacity:'0'},'70%':{transform:'scale(1.08)'},'100%':{transform:'scale(1)',opacity:'1'} },
        fillBar:   { from:{width:'0%'},to:{width:'100%'} },
        out:       { to:{opacity:'0',filter:'blur(3px)'} },
        enter:     { from:{opacity:'0',transform:'translateY(12px)'},to:{opacity:'1',transform:'translateY(0)'} },
        slideIn:   { from:{transform:'translateX(100%)'},to:{transform:'translateX(0)'} },
        pop:       { '0%':{transform:'scale(0.85)',opacity:'0'},'100%':{transform:'scale(1)',opacity:'1'} },
        bob:       { '0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-4px)'} },
      },
      animation: {
        fadeUp:  'fadeUp 0.6s ease both',
        fadeIn:  'fadeIn 0.5s ease both',
        scaleIn: 'scaleIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both',
        fillBar: 'fillBar 1.6s ease both',
        out:     'out 0.5s ease forwards',
        enter:   'enter 0.5s ease both',
        slideIn: 'slideIn 0.25s ease both',
        pop:     'pop 0.2s ease both',
        bob:     'bob 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
