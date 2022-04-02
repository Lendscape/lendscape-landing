module.exports = {
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-optional-chaining",
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "h",
        pragmaFrag: "Fragment",
      },
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "11",
        },
        modules: false,
      },
    ],
    ["@babel/preset-typescript", { jsxPragma: "h" }],
  ],
};
