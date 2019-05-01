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
        "hello world": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI 1.2
                    VISIBLE "HAI WORLD!"
                    KTHXBYE
                \`;
            `
        }
    }
});
