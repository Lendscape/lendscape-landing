module.exports = ({ env }) => ({
  plugins: {
    "postcss-preset-env": {},
    cssnano: env === "development" ? false : {
      "preset": [
        "default",
        { "discardComments": { "removeAll": true }}
      ]
    }
  },
});
