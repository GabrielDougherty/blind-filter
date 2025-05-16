/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Adjust these paths to match your file structure
    "./**/*.html",
    "./**/*.js"
  ],
  darkMode: 'class', // or 'media' for automatic dark mode based on system settings
  theme: {
    extend: {
      // Add any custom theme extensions here
    },
  },
  plugins: [],
}
