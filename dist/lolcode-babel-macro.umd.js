!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){var e=require("babel-plugin-macros");module.exports=(0,e.createMacro)(function(e){var t=e.state,a=e.babel;e.references.default.map(function(e){if("CallExpression"!==e.parentPath.type)throw new Error("This is not supported: `"+e.findParent(a.types.isExpression).getSource()+"`. Please see the webpack-comment-import.macro documentation");!function(e){var t,a=e.referencePath,r=e.babel.types,n=a.parentPath;try{t=n.get("arguments")[0].evaluate().value}catch(e){}if(void 0===t)throw new Error("There was a problem evaluating the value of the argument for the code: "+n.getSource()+". If the value is dynamic, please make sure that its value is statically deterministic.");var i=t.split("/"),o=i[i.length-1];a.parentPath.replaceWith(r.callExpression(r.identifier("import"),[r.stringLiteral(t)])),a.parentPath.get("arguments")[0].addComment("leading"," webpackChunkName: "+o+" ")}({referencePath:e,state:t,babel:a})})})});
//# sourceMappingURL=lolcode-babel-macro.umd.js.map
