/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require.resolve("prettier-plugin-astro"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  pluginSearchDirs: false,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
};
