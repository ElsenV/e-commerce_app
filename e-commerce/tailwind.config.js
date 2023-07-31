/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        smaller_767: "calc(100vh - 172.83975px)",
        bigger_768: "calc(100vh - 182.97675px)",
        register_page: "calc(100vh - 120.97675px)",
      },
      fontSize: {
        sm: ["calc(14px * 0.75)", "calc(20px * 0.75)"],
        base: ["calc(16px * 0.75)", "calc(24px * 0.75)"],
        lg: ["calc(18px * 0.75)", "calc(28px * 0.75)"],
        xl: ["calc(20px * 0.75)", "calc(28px * 0.75)"],
        "2xl": ["calc(24px * 0.75)", "calc(32px * 0.75)"],
        "3xl": ["calc(30px * 0.75)", "calc(36px * 0.75)"],
        "4xl": ["calc(36px * 0.75)", "calc(40px * 0.75)"],
        "5xl": ["calc(48px * 0.75)", "calc(48px * 0.75)"],
        "6xl": ["calc(60px * 0.75)", "calc(60px * 0.75)"],
        "7xl": ["calc(72px * 0.75)", "calc(72px * 0.75)"],
        "8xl": ["calc(96px * 0.75)", "calc(96x * 0.75)"],
        "9xl": ["calc(128px * 0.75)", "calc(128px * 0.75)"],
      },
    },
  },
  plugins: [],
};
