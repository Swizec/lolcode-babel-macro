const { createMacro } = require("babel-plugin-macros");
const compiler = require("./compiler");

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

    return `function () {
        ${compiler(source).join("")}
    }`;
}
