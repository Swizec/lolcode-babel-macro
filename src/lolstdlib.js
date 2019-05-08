/**
 * LOLCODE built in functions.
 */
module.exports = {
    NOT: function(a) {
        return !a;
    },
    "ANY OF": function(var_args) {
        var args = lol.utils.argsArray(arguments);
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                return true;
            }
        }
        return false;
    },
    "BIGGR OF": function(a, b) {
        return Math.max(a, b);
    },
    "SMALLR OF": function(a, b) {
        return Math.min(a, b);
    },
    "SUM OF": function(a, b) {
        return a + b;
    },
    "DIFF OF": function(a, b) {
        return a - b;
    },
    "PRODUKT OF": function(a, b) {
        return a * b;
    },
    "QUOSHUNT OF": function(a, b) {
        return a / b;
    },
    "BOTH OF": function(a, b) {
        return a && b;
    },
    "EITHER OF": function(a, b) {
        return a || b;
    },
    "BOTH SAEM": function(a, b) {
        return a === b;
    },
    SMOOSH: function(var_args) {
        var args = lol.utils.argsArray(arguments);
        return lol.utils.toYarn(
            args.reduce(function(a, b) {
                return lol.utils.toYarn(a) + lol.utils.toYarn(b);
            })
        );
    },
    "BIGGR THAN": function(a, b) {
        return a > b;
    },
    "SMALLR THAN": function(a, b) {
        return a < b;
    },
    "MOD OF": function(a, b) {
        return a % b;
    },
    "LEN OF": function(a) {
        return a && typeof a.length !== "undefined" ? a.length : null;
    },
    "ORD OF": function(a) {
        return a && a.charCodeAt ? a.charCodeAt(0) : -1;
    },
    "CHR OF": function(a) {
        return String.fromCharCode(a);
    }
};
