module.exports = {
  BROTLI: false,

  // Path is relative to this directory
  OUTPUT_DIR: "../../dist/",

  // The path to the bundle in the URL
  PUBLIC_PATH: "/webpack/dist/",

  // Create different entries if you want to generate multiple manual bundles.
  // import() statement will still split chunks inside these bundles.
  ENTRYPOINTS: {
    lendscape_js: "./src/index.ts",
    lendscape_base: "./src/lendscape-base.ts",
  },
};
