const stdlib = require("./lolstdlib");

class JSify {
    Assignment = (node, newIT) => {
        return `${node.name} = ${this.compile(node.value)}`;
    };

    ArgList = (node, newIT) => {
        return node.values.map(this.compile).join(", ");
    };

    Body = (node, newIT) => {
        node.lines = node.lines.map(node => this.compile(node));
        if (newIT) {
            node.lines.unshift(`let IT;`);
        }

        return node.lines.join("\n");
    };

    Break = (node, newIT) => {
        return "break;";
    };

    Declaration = (node, newIT) => {
        let value = "null";

        if (node.value !== null) {
            value = this.compile(node.value);
        }

        return `let ${node.name} = ${value};`;
    };

    FunctionCall = (node, newIT) => {
        if (stdlib[node.name]) {
            return `lolcode.stdlib["${node.name}"](${this.compile(node.args)})`;
        } else {
            return `${node.name}(${this.compile(node.args)})`;
        }
    };

    FunctionDefinition = (node, newIT) => {
        return `function ${node.name}(${node.args.join(", ").toLowerCase()}) {
            ${this.compile(node.body)}
            return IT;
        }`;
    };

    Return = (node, newIT) => {
        return `return ${this.compile(node.expression)}`;
    };

    Identifier = (node, newIT) => {
        return node.name.toLowerCase();
    };

    If = (node, newIT) => {
        let cond = node.condition;

        // MEBBEs have conditions
        // otherwise use implicit IT
        // implementation quirk: previous expression val must be assigned to IT
        if (cond) {
            cond = this.compile(node.condition);
        } else {
            cond = "IT";
        }

        let code = `if (${cond}) {
            ${this.compile(node.body)}
        }`;

        if (node.elseIfs) {
            code += node.elseIfs
                .map(node => `else ${this.compile(node)}`)
                .join("\n");
        }

        if (node.elseBody) {
            code += `else {
                ${this.compile(node.elseBody)}
            }`;
        }

        return code;
    };

    Gimmeh = (node, newIT) => {
        return `${node.variable} = window.prompt()`;
    };

    Visible = (node, newIT) => {
        return `console.log(${this.compile(node.expression)})`;
    };

    Literal = (node, newIT) => {
        if (typeof node.value === "string") {
            return `"${node.value}"`;
        } else {
            return node.value;
        }
    };

    Loop = (node, newIT) => {
        const cond = this.compile(node.condition);
        const op = node.op;
        const body = this.compile(node.body);

        const incordec = op.command == "inc" ? "++" : "--";
        return `for (; ${cond}; _${op.symbol}${incordec}) {
            ${body};
        };`;
    };

    LoopCondition = (node, newIT) => {
        if (!node) {
            return "true";
        } else {
            const expr = this.compile(node.expression);
            return node.check === "while" ? expr : `!${expr}`;
        }
    };

    NoOp = (node, newIT) => {
        return "() => {}";
    };

    Switch = (node, newIT) => {
        // LOLCODE switches operate on implicit IT variable
        // implementation quirk:
        // you have to explicitly assign to IT on previous line

        return `switch(IT) {
            ${node.branches.map(this.compile).join("\n")}
        };`;
    };

    Case = (node, newIT) => {
        return `case ${this.compile(node.condition)}:
            ${this.compile(node.body, false)}
        `;
    };

    CaseDefault = (node, newIT) => {
        return `default:
            ${this.compile(node.body, false)}
        `;
    };

    compile = (node, newIT = true) => {
        if (this[node._name]) {
            node = this[node._name](node, newIT);
        } else {
            throw new Error(`Not implemented: ${node._name}`);
        }

        return node;
    };
}

module.exports = JSify;
