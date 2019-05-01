const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(myMacro);

function myMacro({ references, state, babel }) {
    references.lolcode.forEach(referencePath => {
        const compiled = compileLolcode(referencePath);
        referencePath.parentPath.replaceWithSourceString(compiled);
    });
}

function compileLolcode(referencePath) {
    const source = referencePath.parentPath.node.quasi.quasis
        .map(node => node.value.raw)
        .join("");

    console.log(source);

    return `function () {
        console.log("HAI WORLD!");
    }`;
}
