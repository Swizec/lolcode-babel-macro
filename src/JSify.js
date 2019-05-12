const stdlib = require("./lolstdlib");

class JSify {
    Assignment = node => {
        return `${node.name} = ${this.compile(node.value)}`;
    };

    ArgList = node => {
        return node.values.map(this.compile).join(", ");
    };

    Body = node => {
        node.lines = node.lines.map(node => this.compile(node));
        node.lines.unshift(`let IT;`);
        return node.lines.join("\n");
    };

    Declaration = node => {
        let value = "null";

        if (node.value !== null) {
            value = this.compile(node.value);
        }

        return `let ${node.name} = ${value};`;
    };

    FunctionCall = node => {
        if (stdlib[node.name]) {
            return `lolcode.stdlib["${node.name}"](${this.compile(node.args)})`;
        } else {
            return `${node.name}(${this.compile(node.args)})`;
        }
    };

    FunctionDefinition = node => {
        return `function ${node.name}(${node.args.join(", ").toLowerCase()}) {
            ${this.compile(node.body)}
        }`;
    };

    Return = node => {
        return `return ${this.compile(node.expression)}`;
    };

    Identifier = node => {
        return node.name.toLowerCase();
    };

    If = node => {
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

    Gimmeh = node => {
        return `${node.variable} = window.prompt()`;
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

    Loop = node => {
        const cond = this.compile(node.condition);
        const op = node.op;
        const body = this.compile(node.body);

        const incordec = op.command == "inc" ? "++" : "--";
        return `for (; ${cond}; _${op.symbol}${incordec}) {
            ${body};
        };`;
    };

    LoopCondition = node => {
        if (!node) {
            return "true";
        } else {
            const expr = this.compile(node.expression);
            return node.check === "while" ? expr : `!${expr}`;
        }
    };

    NoOp = node => {
        return "() => {}";
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

module.exports = JSify;
