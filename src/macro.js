const { createMacro } = require("babel-plugin-macros");
const { parser } = require("@swizec/loljs");
const JSify = require("./JSify");

module.exports = createMacro(myMacro);

function myMacro({ references, state, babel }) {
    references.lolcode.forEach(referencePath => {
        const compiled = compileLolcode(referencePath);
        console.log(compiled);
        referencePath.parentPath.replaceWithSourceString(compiled);
    });
}

function compileLolcode(referencePath) {
    const source = referencePath.parentPath.node.quasi.quasis
        .map(node => node.value.raw)
        .join("");

    const ast = parser.parse(source);
    const jsify = new JSify();

    return `function () {
       ${jsify.compile(ast)} 
    }`;
}
