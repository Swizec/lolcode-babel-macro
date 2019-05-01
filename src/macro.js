const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(myMacro);

function myMacro({ references, state, babel }) {
    references.default.map(referencePath => {
        if (referencePath.parentPath.type === "CallExpression") {
            requireWebpackCommentImport({ referencePath, state, babel });
        } else {
            throw new Error(
                `This is not supported: \`${referencePath
                    .findParent(babel.types.isExpression)
                    .getSource()}\`. Please see the webpack-comment-import.macro documentation`
            );
        }
    });
}

function requireWebpackCommentImport({ referencePath, state, babel }) {
    const t = babel.types;
    const callExpressionPath = referencePath.parentPath;
    let webpackCommentImportPath;

    try {
        webpackCommentImportPath = callExpressionPath
            .get("arguments")[0]
            .evaluate().value;
    } catch (err) {
        // swallow error, print better error below
    }

    if (webpackCommentImportPath === undefined) {
        throw new Error(
            `There was a problem evaluating the value of the argument for the code: ${callExpressionPath.getSource()}. ` +
                `If the value is dynamic, please make sure that its value is statically deterministic.`
        );
    }

    const webpackCommentImportPathParts = webpackCommentImportPath.split("/");
    const identifier =
        webpackCommentImportPathParts[webpackCommentImportPathParts.length - 1];

    referencePath.parentPath.replaceWith(
        t.callExpression(t.identifier("import"), [
            t.stringLiteral(webpackCommentImportPath)
        ])
    );

    referencePath.parentPath
        .get("arguments")[0]
        .addComment("leading", ` webpackChunkName: ${identifier} `);
}
