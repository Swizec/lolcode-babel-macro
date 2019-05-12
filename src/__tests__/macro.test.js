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
        "declaration with value": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    I HAS A VAR ITS 10
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
                    I HAS A val
                    GIMMEH val
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
                    IT R BOTH SAEM 1 AN 2 
                    O RLY?
                        YA RLY
                            VISIBLE WIN
                        NO WAI
                            VISIBLE FAIL
                    OIC
                    KTHXBYE
                \`;
            `
        },
        elseif: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    IT R BOTH SAEM 1 AN 2 
                    O RLY?
                        YA RLY
                            VISIBLE WIN
                        MEBBE BOTH SAEM IT AN false
                            VISIBLE "MEBBE"
                        NO WAI
                            VISIBLE FAIL
                    OIC
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
                    I HAS A i ITS 0
                    IM IN YR loopy UPPIN YR i TIL BOTH SAEM i AN 10
                        VISIBLE SUM OF i AN 1
                    IM OUTTA YR loopy
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
                    O NVM
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
                    HOW DUZ I IZYELLOW
                        I HAS A val ITS true
                        FOUND YR val
                    IF U SAY SO
                    KTHXBYE
                \`;
            `
        },
        "implicit return": {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    HOW DUZ I IZYELLOW
                        I HAS A val ITS true
                        IT R val
                    IF U SAY SO
                    KTHXBYE
                \`;
            `
        },
        // break: {
        //     error: false,
        //     code: `
        //         import { lolcode } from '../macro';
        //         const code = lolcode\`
        //             HAI
        //             HOW DUZ I IZYELLOW
        //                 I HAS A val ITS true
        //                 IT R val
        //                 GTFO
        //             IF U SAY SO
        //             KTHXBYE
        //         \`;
        //     `
        // },
        switch: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                    IT R BOTH SAEM "lolcode" AN "lolcat"
                    WTF?
                        OMG true
                            VISIBLE "is true"
                            GTFO
                        OMG false
                            VISIBLE "nah"
                            GTFO
                        OMGWTF
                            VISIBLE "trinary?"
                    OIC
                    KTHXBYE
                \`;
            `
        },
        builtins: {
            error: false,
            code: `
                import { lolcode } from '../macro';
                const code = lolcode\`
                    HAI
                        I HAS A thing ITS 10
                        I HAS A aval ITS true
                        I HAS A bval ITS false
                        thing R NOT 10
                        thing R BOTH SAEM aval AN bval
                    KTHXBYE
                \`;
            `
        }
    }
});
