module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], //purge対象: pages, compnents
  darkMode: false, // or 'media' or 'class'
  theme: {
    cursor: {
      grab: "grab",
      grabbing: "grabbing",
    },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      50: "50px",
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      40: "10rem",
      64: "16rem",
      screen: "100vh",
    },
    extend: {},
  },
  variants: {
    extend: {},
    backgroundColor: ({ after }) => after(["active"]),
  },
  plugins: [],
};
