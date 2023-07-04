/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors : {
        "brown" : {
          100 : "#ECE0D1",
          300 : "#DBC1AC",
          600 : "#967259",
          900 : "#634832",
        }
      },
      boxShadow : {
        "normal" : "0px 1px 10px rgba(0, 0, 0, 0.05)",
      },
      borderRadius : {
        "4xl" : "2rem"
      },
      fontFamily : {
        "Dana" : "Dana",
        "DanaMedium" : "Dana Medium",
        "DanaBold" : "Dana Bold",

        "MorabbaLight" : "Morabba Light",
        "MorabbaMedium" : "Morabba Medium",
        "MorabbaBold" : "Morabba Bold",
      },
      letterSpacing:{
        "tightest" : "-0.0625em"
      },
      container:{
        center: true,
        padding : {
          DEFAULT : "1rem",
          lg : "0.625rem"
        }
      },
      backgroundImage: {
        'slide-1-D': "url('/images/sliders/1.webp')",
        'slide-1-M': "url('/images/sliders/1M.webp')",
        'slide-2-D': "url('/images/sliders/2.jpg')",
        'slide-3-D': "url('/images/sliders/3.jpg')",
        'product-bg': "url('/images/product-bg.png')",
        'product-bg2': "url('/images/product-bg2.png')",
      }
    },
    screens:{
      "xs" : "480px",
      "sm" : "640px",
      "md" : "768px",
      "lg" : "1024px",
      "xl" : "1280px",
    }
  },
  plugins: [
    function({addVariant}){
      addVariant("child" , "& > *");
      addVariant("child-hover" , "& > *:hover");
    }
  ],
}

