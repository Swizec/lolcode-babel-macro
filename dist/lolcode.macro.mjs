import{createMacro as n}from"babel-plugin-macros";import{parser as t}from"@swizec/loljs";var e={NOT:function(n){return!n},"ANY OF":function(n){for(var t=lol.utils.argsArray(arguments),e=0;e<t.length;e++)if(t[e])return!0;return!1},"BIGGR OF":function(n,t){return Math.max(n,t)},"SMALLR OF":function(n,t){return Math.min(n,t)},"SUM OF":function(n,t){return n+t},"DIFF OF":function(n,t){return n-t},"PRODUKT OF":function(n,t){return n*t},"QUOSHUNT OF":function(n,t){return n/t},"BOTH OF":function(n,t){return n&&t},"EITHER OF":function(n,t){return n||t},"BOTH SAEM":function(n,t){return n===t},SMOOSH:function(n){var t=lol.utils.argsArray(arguments);return lol.utils.toYarn(t.reduce(function(n,t){return lol.utils.toYarn(n)+lol.utils.toYarn(t)}))},"BIGGR THAN":function(n,t){return n>t},"SMALLR THAN":function(n,t){return n<t},"MOD OF":function(n,t){return n%t},"LEN OF":function(n){return n&&void 0!==n.length?n.length:null},"ORD OF":function(n){return n&&n.charCodeAt?n.charCodeAt(0):-1},"CHR OF":function(n){return String.fromCharCode(n)}},r=function(){var n=this;this.Assignment=function(t,e){return t.name+" = "+n.compile(t.value)},this.ArgList=function(t,e){return t.values.map(n.compile).join(", ")},this.Body=function(t,e){return t.lines=t.lines.map(function(t){return n.compile(t)}),e&&t.lines.unshift("let IT;"),t.lines.join("\n")},this.Break=function(n,t){return"break;"},this.Declaration=function(t,e){var r="null";return null!==t.value&&(r=n.compile(t.value)),"let "+t.name+" = "+r+";"},this.FunctionCall=function(t,r){return e[t.name]?'stdlib["'+t.name+'"]('+n.compile(t.args)+")":t.name+"("+n.compile(t.args)+")"},this.FunctionDefinition=function(t,e){return"function "+t.name+"("+t.args.join(", ").toLowerCase()+") {\n            "+n.compile(t.body)+"\n            return IT;\n        }"},this.Return=function(t,e){return"return "+n.compile(t.expression)},this.Identifier=function(n,t){return n.name.toLowerCase()},this.If=function(t,e){var r=t.condition,i="if ("+(r=r?n.compile(t.condition):"IT")+") {\n            "+n.compile(t.body)+"\n        }";return t.elseIfs&&(i+=t.elseIfs.map(function(t){return"else "+n.compile(t)}).join("\n")),t.elseBody&&(i+="else {\n                "+n.compile(t.elseBody)+"\n            }"),i},this.Gimmeh=function(n,t){return n.variable+" = window.prompt()"},this.Visible=function(t,e){return"console.log("+n.compile(t.expression)+")"},this.Literal=function(n,t){return"string"==typeof n.value?'"'+n.value+'"':n.value},this.Loop=function(t,e){var r=n.compile(t.condition),i=t.op,o=n.compile(t.body);return"for (; "+r+"; _"+i.symbol+("inc"==i.command?"++":"--")+") {\n            "+o+";\n        };"},this.LoopCondition=function(t,e){if(t){var r=n.compile(t.expression);return"while"===t.check?r:"!"+r}return"true"},this.NoOp=function(n,t){return"() => {}"},this.Switch=function(t,e){return"switch(IT) {\n            "+t.branches.map(n.compile).join("\n")+"\n        };"},this.Case=function(t,e){return"case "+n.compile(t.condition)+":\n            "+n.compile(t.body,!1)+"\n        "},this.CaseDefault=function(t,e){return"default:\n            "+n.compile(t.body,!1)+"\n        "},this.compile=function(t,e){if(void 0===e&&(e=!0),!n[t._name])throw new Error("Not implemented: "+t._name);return n[t._name](t,e)}};export default n(function(n){n.references.lolcode.forEach(function(n){var e=function(n){var e=n.parentPath.node.quasi.quasis.map(function(n){return n.value.raw}).join(""),i=t.parse(e);return"(function (stdlib) {\n        return function() {\n            "+(new r).compile(i)+" \n        }\n    })(lolstdlib)"}(n);n.parentPath.replaceWithSourceString(e)})});
//# sourceMappingURL=lolcode.macro.mjs.map
