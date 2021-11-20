module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], //purge対象: pages, compnents
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      grab: "grab",
      grabbing: "grabbing",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
