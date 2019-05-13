import { createMacro } from "babel-plugin-macros";
import { parser } from "@swizec/loljs";

import JSify from "./JSify";
import stdlib from "./lolstdlib";

const macro = createMacro(myMacro);
macro.stdlib = stdlib;

export default macro;

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

    const ast = parser.parse(source);
    const jsify = new JSify();

    return `function () {
       ${jsify.compile(ast)} 
    }`;
}
