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
        return prettier.format(result, {
            trailingComma: "es5"
        });
    },
    tests: {
        "hello world": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    VISIBLE "HAI WORLD!"
                    KTHXBYE
                \`;
            `
        },
        assignment: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    I HAS A VAR
                    VAR R 3
                    KTHXBYE
                \`;
            `
        },
        declaration: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    I HAS A VAR
                    KTHXBYE
                \`;
            `
        },
        functioncall: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    HOW DUZ I IZCOLOR YR COLOR
                        VISIBLE COLOR
                    IF U SAY SO
                    IZCOLOR "yellow" MKAY
                    KTHXBYE
                \`;
            `
        },
        "functiondefinition with args": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    HOW DUZ I IZCOLOR YR COLOR
                        VISIBLE color
                    IF U SAY SO
                    KTHXBYE
                \`;
            `
        },
        "functiondefinition with return": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    HOW DUZ I IZCOLOR YR COLOR
                        FOUND YR color
                    IF U SAY SO
                    KTHXBYE
                \`;
            `
        },
        functiondefinition: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                     HOW DUZ I IZYELLOW
                        VISIBLE "yellow"
                    IF U SAY SO
                    KTHXBYE
                \`;
            `
        },
        gimmeh: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        if: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    WIN, O RLY?
                        YA RLY
                            VISIBLE WIN
                        NO WAI
                            VISIBLE FAIL
                    OIC
                    KTHXBYE
                \`;
            `
        },
        indexer: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        loop: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        loopcondition: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        noop: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        return: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        },
        switch: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    
                    KTHXBYE
                \`;
            `
        }
    }
});
