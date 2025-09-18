/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
      colors: {
        primary: {
          purple: "#8B75FF",
          purpleDark: "#7a66e6",
          light: "#F1EEFF",  
        },
        gray: {
          dark: "#110C22",   
          medium: "#4F4B5C",  
          light: "#8D8A95", 
          border: "#E2E2E4",  
          divider: "#ECECED", 
        },
        accent: {
          orange: "#F56A00",
          blue: "#348BE8",
        },
      },
      fontSize: {
        sm: ["13px", { lineHeight: "20px", letterSpacing: "-0.03em" }],
        base: ["15px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
        lg: ["16px", { lineHeight: "24px", letterSpacing: "-0.01em" }],
        xl: ["30px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        dropdown: "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)",
        notification: "0px 20px 24px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};
