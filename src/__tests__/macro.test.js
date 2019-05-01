const path = require("path");
const pluginTester = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");
const prettier = require("prettier");

pluginTester({
    plugin,
    snapshot: true,
    babelOptions: {
        filename: __filename
    },
    formatResult(result) {
        return prettier.format(result, { trailingComma: "es5" });
    },
    tests: {
        "no usage": `import wcImport from "../macro";`,
        "basic usage": `
      import wcImport from "../macro";
      const asyncModule = wcImport("./MyComponent");
    `
    }
});
