/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "border-clr": "rgb(var(--border-clr) / <alpha-value>)",
        "table-clr": "rgb(var(--table-clr) / <alpha-value>)",
        "sidebar-clr": "rgb(var(--sidebar-clr) / <alpha-value>)",
        "border-focus-clr": "rgb(var(--border-focus-clr) / <alpha-value>)",
        "text-clr": "rgb(var(--text-clr) / <alpha-value>)",
        "button-clr": "rgb(var(--button-clr) / <alpha-value>)",
        "bg-clr": "rgb(var(--bg-clr) / <alpha-value>)",
        "form-modal-clr": "rgb(var(--form-modal-clr) / <alpha-value>)",
        "error-bg": "rgb(var(--error-bg) / <alpha-value>)",
        "error-border": "rgb(var(--error-border) / <alpha-value>)",
        "error-text": "rgb(var(--error-text) / <alpha-value>)",
      },
      spacing: {
        "topnav-height": "var(--topnav-height)"
      },
      minHeight: {
        "topnav-height": "var(--topnav-height)"
      },
      maxHeight: {
        "topnav-height": "var(--topnav-height)"
      }
    },
  },
  plugins: [],
};
