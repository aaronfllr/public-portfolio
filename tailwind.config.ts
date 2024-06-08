import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "forest-green": "#228B22",
      "earth-brown": "#8B4513",
      "sky-blue": "#87CEEB",
      "sunset-orange": "#FFA07A",
      "mountain-grey": "#A9A9A9",
      "leaf-green": "#32CD32",
      "river-blue": "#4682B4",
      "sand-beige": "#F4A460",
      "hit-pink": {
        50: '#fff3ed',
        100: '#ffe3d4',
        200: '#ffc4a9',
        300: '#ffa07a',
        400: '#fe6639',
        500: '#fc3e13',
        600: '#ed2409',
        700: '#c51609',
        800: '#9c1310',
        900: '#7e1310',
        950: '#440606',
    },
    },
    
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/forrestBackground.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;