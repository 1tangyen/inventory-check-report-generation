/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        winter: {
          // Customized "winter" theme with expanded color palette
          primary: "#E1242A", // Primary button or link color
          secondary: "#891515", // Secondary elements, possibly for accents
          neutral: "#34373F", // Typically used for text, backgrounds, and borders
          "base-100": "#EDF2F4", // Background color for your application
          info: "#A1A4AC", // Used for informational text or elements
          success: "#4ADE80", // Success messages or indicators, adjust as needed
          warning: "#FACC15", // Warnings or cautionary information, adjust as needed
          error: "#EF4444", // Error messages or critical indicators, adjust as needed
          black: "#000000", // For deeply neutral or contrast text/elements
          white: "#FFFFFF", // For pure background or contrast text/elements
          "accent-1": "#F78C85", // New color 1, can be used for lighter accents
          "accent-2": "#BD120A", // New color 2, stronger or more urgent accents
          "accent-3": "#450A0A", // New color 3, possibly for very dark accents or backgrounds
        },

        dracula: {
          // Redefining "dracula" as a dark theme with your color palette
          primary: "#E1242A", // Primary color for buttons or important elements
          secondary: "#F78C85", // Secondary color, lighter for contrast against dark backgrounds
          accent: "#BD120A", // Accent color for highlighting or small elements
          neutral: "#34373F", // Neutral color for text and backgrounds
          "base-100": "#2D2D2D", // Dark background color, adjusted for dark theme readability
          info: "#A1A4AC", // Info color for informational text or icons
          success: "#4ADE80", // Success color, adjust based on your preference
          warning: "#FACC15", // Warning color, adjust as needed
          error: "#EF4444", // Error color for error messages or critical elements
          black: "#000000", // Black color, for text or elements on light backgrounds
          white: "#FFFFFF", // White color, mainly for text against dark backgrounds
          "accent-1": "#891515", // Additional accent color, for depth or emphasis
          "accent-2": "#450A0A", // Darker accent, for subtle backgrounds or elements
          // "base-200", "base-300", etc., can be added for more nuanced background or surface levels
        },
      },
      // Other themes or custom themes can be added here
    ],
  },
};
