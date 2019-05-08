class JSify {
    Assignment = node => {
        return `${node.name} = ${this.compile(node.value)}`;
    };

    ArgList = node => {
        return node.values.map(this.compile).join(", ");
    };

    Body = node => {
        node.lines = node.lines.map(node => this.compile(node));
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
        return `${node.name}(${this.compile(node.args)})`;
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
        return `if (${name.condition}) {
            ${this.compile(node.body)}
        }else{
            ${this.compile(node.elseBody)}
        }`;
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

module.exports = JSify;
