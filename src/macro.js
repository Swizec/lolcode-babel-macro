const { createMacro } = require("babel-plugin-macros");
// const compiler = require("./compiler");
const { parser } = require("@swizec/loljs");

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

class JSify {
    Body = node => {
        node.lines = node.lines.map(node => this.compile(node));
        return node.lines.join("\n");
    };

    Visible = node => {
        return `console.log(${this.compile(node.expression)})`;
    };

    Literal = node => {
        if (typeof node.value === "string") {
            return `"${node.value}"`;
        } else {
            return node.value;
        }
    };

    compile = node => {
        if (this[node._name]) {
            node = this[node._name](node);
        } else {
            throw new Error(`Not implemented: ${node._name}`);
        }

        return node;
    };
}
