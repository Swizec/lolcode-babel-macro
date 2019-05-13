var n = require("babel-plugin-macros"),
    e = require("@swizec/loljs"),
    t = {
        NOT: function (n) {
            return !n
        },
        "ANY OF": function (n) {
            for (var e = lol.utils.argsArray(arguments), t = 0; t < e.length; t++)
                if (e[t]) return !0;
            return !1
        },
        "BIGGR OF": function (n, e) {
            return Math.max(n, e)
        },
        "SMALLR OF": function (n, e) {
            return Math.min(n, e)
        },
        "SUM OF": function (n, e) {
            return n + e
        },
        "DIFF OF": function (n, e) {
            return n - e
        },
        "PRODUKT OF": function (n, e) {
            return n * e
        },
        "QUOSHUNT OF": function (n, e) {
            return n / e
        },
        "BOTH OF": function (n, e) {
            return n && e
        },
        "EITHER OF": function (n, e) {
            return n || e
        },
        "BOTH SAEM": function (n, e) {
            return n === e
        },
        SMOOSH: function (n) {
            var e = lol.utils.argsArray(arguments);
            return lol.utils.toYarn(e.reduce(function (n, e) {
                return lol.utils.toYarn(n) + lol.utils.toYarn(e)
            }))
        },
        "BIGGR THAN": function (n, e) {
            return n > e
        },
        "SMALLR THAN": function (n, e) {
            return n < e
        },
        "MOD OF": function (n, e) {
            return n % e
        },
        "LEN OF": function (n) {
            return n && void 0 !== n.length ? n.length : null
        },
        "ORD OF": function (n) {
            return n && n.charCodeAt ? n.charCodeAt(0) : -1
        },
        "CHR OF": function (n) {
            return String.fromCharCode(n)
        }
    },
    r = function () {
        var n = this;
        this.Assignment = function (e, t) {
            return e.name + " = " + n.compile(e.value)
        }, this.ArgList = function (e, t) {
            return e.values.map(n.compile).join(", ")
        }, this.Body = function (e, t) {
            return e.lines = e.lines.map(function (e) {
                return n.compile(e)
            }), t && e.lines.unshift("let IT;"), e.lines.join("\n")
        }, this.Break = function (n, e) {
            return "break;"
        }, this.Declaration = function (e, t) {
            var r = "null";
            return null !== e.value && (r = n.compile(e.value)), "let " + e.name + " = " + r + ";"
        }, this.FunctionCall = function (e, r) {
            return t[e.name] ? 'lolcode.stdlib["' + e.name + '"](' + n.compile(e.args) + ")" : e.name + "(" + n.compile(e.args) + ")"
        }, this.FunctionDefinition = function (e, t) {
            return "function " + e.name + "(" + e.args.join(", ").toLowerCase() + ") {\n            " + n.compile(e.body) + "\n            return IT;\n        }"
        }, this.Return = function (e, t) {
            return "return " + n.compile(e.expression)
        }, this.Identifier = function (n, e) {
            return n.name.toLowerCase()
        }, this.If = function (e, t) {
            var r = e.condition,
                i = "if (" + (r = r ? n.compile(e.condition) : "IT") + ") {\n            " + n.compile(e.body) + "\n        }";
            return e.elseIfs && (i += e.elseIfs.map(function (e) {
                return "else " + n.compile(e)
            }).join("\n")), e.elseBody && (i += "else {\n                " + n.compile(e.elseBody) + "\n            }"), i
        }, this.Gimmeh = function (n, e) {
            return n.variable + " = window.prompt()"
        }, this.Visible = function (e, t) {
            return "console.log(" + n.compile(e.expression) + ")"
        }, this.Literal = function (n, e) {
            return "string" == typeof n.value ? '"' + n.value + '"' : n.value
        }, this.Loop = function (e, t) {
            var r = n.compile(e.condition),
                i = e.op,
                o = n.compile(e.body);
            return "for (; " + r + "; _" + i.symbol + ("inc" == i.command ? "++" : "--") + ") {\n            " + o + ";\n        };"
        }, this.LoopCondition = function (e, t) {
            if (e) {
                var r = n.compile(e.expression);
                return "while" === e.check ? r : "!" + r
            }
            return "true"
        }, this.NoOp = function (n, e) {
            return "() => {}"
        }, this.Switch = function (e, t) {
            return "switch(IT) {\n            " + e.branches.map(n.compile).join("\n") + "\n        };"
        }, this.Case = function (e, t) {
            return "case " + n.compile(e.condition) + ":\n            " + n.compile(e.body, !1) + "\n        "
        }, this.CaseDefault = function (e, t) {
            return "default:\n            " + n.compile(e.body, !1) + "\n        "
        }, this.compile = function (e, t) {
            if (void 0 === t && (t = !0), !n[e._name]) throw new Error("Not implemented: " + e._name);
            return n[e._name](e, t)
        }
    },
    i = n.createMacro(function (n) {
        n.references.lolcode.forEach(function (n) {
            var t = function (n) {
                var t = n.parentPath.node.quasi.quasis.map(function (n) {
                        return n.value.raw
                    }).join(""),
                    i = e.parser.parse(t);
                return "function () {\n       " + (new r).compile(i) + " \n    }"
            }(n);
            n.parentPath.replaceWithSourceString(t)
        })
    });
i.stdlib = t, module.exports = i;
//# sourceMappingURL=lolcode-babel-macro.js.map