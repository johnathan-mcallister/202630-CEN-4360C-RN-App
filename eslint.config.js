// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const typescriptConfig = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  expoConfig,
  typescriptConfig,
  {
    ignores: ["dist/*", "node_modules/*", "coverage/*", ".env*"],
  },
]);
