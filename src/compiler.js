// Borrowed from http://fullvolume.co.uk/static/lolcode/

function gololcode(code) {
    code += "\n";
    var html = new Array();

    if (code.indexOf("HAI") < 0 || code.indexOf("KTHXBYE") < 0) {
        console.error("No LOLCODE found. Did you forget to HAI or KTHXBYE?");
    }

    // Find code between HAI and KTHXBYE
    // Allow only 1 lolcode block per `code`
    let lolcode = code.split("\n");
    while (!lolcode[0].match(/HAI [0-9\.]+/g)) {
        lolcode.shift();
    }
    while (!lolcode[lolcode.length - 1].match(/KTHXBYE/g)) {
        lolcode.pop();
    }
    lolcode.shift();
    lolcode.pop();

    // The lolcode has been isolated, execute and display
    let output = lolcode.map(code => execlolcode(code));

    return output;
}
function trim(s) {
    var l = 0;
    var r = s.length - 1;
    while (l < s.length && s[l] == " ") {
        l++;
    }
    while (r > l && s[r] == " ") {
        r -= 1;
    }
    return s.substring(l, r + 1);
}
function execlolcode(code) {
    var lolcode = code.replace(/\n\n/g, "\n").split("\n");
    var output = "";

    var command = new Array();
    var z = 0;
    var yarn = new Array();
    var s = 0;

    var IT;
    var tmp1;
    var tmp2;
    var tmp3;
    var line;
    var part;
    var y;
    var quit;
    var end;
    var comment = false;
    // First pass - filter out strings, perform command joining/splitting
    for (var x = 0; x < lolcode.length; x++) {
        line = "";
        quit = false;
        end = false;
        if (lolcode[x].indexOf('"') >= 0) {
            part = lolcode[x].split('"');
        } else {
            part = new Array();
            part[0] = lolcode[x];
        }
        tmp1 = false;
        for (y = 0; y < part.length; y++) {
            if (tmp1) {
                // Inside literal string
                if (part[y].substr(-1) == ":") {
                    // This was a literal " so join the next section
                    part[y + 1] = part[y] + '"' + part[y + 1];
                    part[y] = "";
                } else {
                    // We got all this quote, so put it away for now
                    yarn[s] = part[y].replace(/:\)/g, "\n");
                    yarn[s] = part[y].replace(/:>/g, "\t");
                    yarn[s] = part[y].replace(/:o/g, "g");
                    yarn[s] = part[y].replace(/:\"/g, '"');
                    yarn[s] = part[y].replace(/::/g, ":");
                    part[y] = s;
                    s++;
                    tmp1 = false;
                }
            } else if (comment) {
                if (part[0].indexOf("TLDR") >= 0) {
                    comment = false;
                    if (lolcode[x].indexOf(",") > lolcode[x].indexOf("TLDR")) {
                        lolcode[x] = lolcode[x].substr(
                            lolcode[x].indexOf(",") + 1
                        );
                        x--;
                    }
                }
                quit = true;
            } else {
                // Outside literal string
                part[y] = part[y].replace(/  /g, " ");
                if (part[y].indexOf(" BTW") >= 0) {
                    part[y] = part[y].substr(0, part[y].indexOf(" BTW"));
                    end = true;
                }
                if (part[y].indexOf(",") >= 0) {
                    tmp3 = part[y].indexOf(",") + 1;
                    for (tmp2 = 0; tmp2 < y; tmp2++) {
                        if (tmp2 % 2 == 0) {
                            tmp3 = tmp3 + part[tmp2].length + 1;
                        } else {
                            tmp3 = tmp3 + yarn[part[tmp2]].length + 1;
                        }
                    }
                    lolcode[x] = lolcode[x].substr(tmp3);
                    part[y] = part[y].substr(0, part[y].indexOf(","));
                    x--;
                    end = true;
                }
                if (part[y].indexOf("...") >= 0) {
                    line = part.join(":").replace(/::/g, ":");
                    lolcode[x + 1] =
                        line.substr(0, line.indexOf("...")) +
                        " " +
                        lolcode[x + 1];
                    lolcode[x] = "";
                    quit = true;
                }
                if (!end && !quit && y == 0 && part[0].indexOf("OBTW") >= 0) {
                    comment = true;
                    quit = true;
                }
                tmp1 = true;
            }
            if (quit || end) {
                for (y = y + 1; y < part.length; y++) {
                    part[y] = "";
                }
            }
        }
        line = trim(
            part
                .join(":")
                .replace(/::/g, ":")
                .replace(/\ \ /g, " ")
        );
        if (line.substr(-1) == ":" && line.indexOf(":") == line.length - 1) {
            line = line.substr(0, line.length - 1);
        }
        if (!quit && line) {
            command[z] = line;
            z++;
        }
    }

    // Second pass - execute it all
    for (z = 0; z < command.length; z++) {
        // Matches:
        // Variable: ([a-z\_]*)
        // Variable or number: ([a-z0-9\_]*)
        // Variable, string or number: ([a-z0-9\_\:]*)
        // Everything: ([\s\S]*)

        // Variables
        command[z] = command[z].replace(/^I HAS A ([a-z\_]*)/i, "var $1"); // Assign variables
        command[z] = command[z].replace(
            /^var ([a-z\_]*) (R|IZ|ITZ) BUKKIT/i,
            "var $1 = new Array"
        ); // Set array
        command[z] = command[z].replace(
            /^var ([a-z\_]*) (R|IZ|ITZ) ([a-z0-9\_\:]*)/i,
            "var $1 = $3"
        ); // Set variable
        command[z] = command[z].replace(
            /([a-z\_]*) (R|ITZ|IZ|R MAEK) ([a-z0-9\_\:]*)$/i,
            "$1 = $3"
        ); // Assign Value

        // Casting
        command[z] = command[z].replace(/^MAEK ([a-z\_]*) A ([\s\S]*)/i, ""); // Assign Type
        command[z] = command[z].replace(/^([a-z\_]*) IS NOW A ([\s\S]*)/i, ""); // Assign Type
        command[z] = command[z].replace(
            /^([a-z\_]*) R MAEK ([a-z0-9\_\:]*) A ([\s\S]*)/i,
            "$1 = $2"
        ); // Assign Value & Type

        // Math
        command[z] = command[z].replace(
            /SUM OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "$1+$2"
        ); // +
        command[z] = command[z].replace(
            /DIFF OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "$1-$2"
        ); // -
        command[z] = command[z].replace(
            /PRODUKT OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "$1*$2"
        ); // *
        command[z] = command[z].replace(
            /QUOSHUNT OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "$1/$2"
        ); // /
        command[z] = command[z].replace(
            /MOD OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "$1%$2"
        ); // mod
        command[z] = command[z].replace(
            /(MAX|BIGGR) OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "Math.max($2,$3)"
        ); // max
        command[z] = command[z].replace(
            /(MIN|SMALLR) OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "Math.min($2,$3)"
        ); // min
        command[z] = command[z].replace(/^UPZ ([a-z\_]*)/i, "$1++;"); // ++
        command[z] = command[z].replace(
            /^([a-z]*)\+\+\!\!([0-9]*)/i,
            "$1 = $1 + $2"
        ); // +=
        command[z] = command[z].replace(/^DOWNZ ([a-z\_]*)/i, "$1--;"); // --
        command[z] = command[z].replace(
            /^([a-z]*)\+\+\!\!([0-9]*)/i,
            "$1 = $1 - $2"
        ); // -=

        // Boolean
        command[z] = command[z].replace(/WIN/g, "true");
        command[z] = command[z].replace(/FAIL/g, "false");
        command[z] = command[z].replace(
            /BOTH OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "($1&&$2?true:false)"
        ); // &&
        command[z] = command[z].replace(
            /EITHER OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "($1||$2?true:false)"
        ); // ||
        command[z] = command[z].replace(
            /WON OF ([a-z0-9\_]*) AN ([\s\S]*)/i,
            "($1==$2?false:true)"
        ); // XOR
        command[z] = command[z].replace(
            /NOT ([a-z0-9\_]*)/i,
            "($1?false:true)"
        ); // !

        // Comparison
        command[z] = command[z].replace(
            /BOTH SAEM ([a-z0-9\_\:]*) AN ([\s\S]*)/i,
            "($1==$2?true:false)"
        ); // ==
        command[z] = command[z].replace(
            /DIFFRINT ([a-z0-9\_\:]*) AN ([\s\S]*)/i,
            "($1!=$2?true:false)"
        ); // !=

        // Missing:Concation

        // Input/Output
        command[z] = command[z].replace(
            /^(GIMMEH|GIMME|GEMMEH) ([a-z\_]*)/i,
            '$2 = prompt("$2 (lolcode GEMMEH)");'
        ); // Get yarn
        command[z] = command[z].replace(
            /^VISIBLE ([\s\S]*)/i,
            "console.log($1);"
        ); // Display yarn

        // Statements
        command[z] = command[z].replace(/OIC/, "}"); // End statement
        // If/Then/Else
        command[z] = command[z].replace(/O RLY\?/, ""); // IF statement
        command[z] = command[z].replace(/YA RLY/, "if (IT) {"); // Start IF
        command[z] = command[z].replace(/NO WAI/, "} else {"); // Else statement
        command[z] = command[z].replace(/MEBBE ([\s\S]*)/, "} else if($1) {"); // ElseIf statement
        // Case
        command[z] = command[z].replace(/WTF\?/, "switch (IT) {"); // Case statement
        command[z] = command[z].replace(/OMG ([\s\S]*)/, "case $1:"); // Case item
        command[z] = command[z].replace(/GTFO/, "break;"); // Case break
        command[z] = command[z].replace(/OMGWTF/, "default:"); // Case default
        // Missing: Loops

        // Functions
        command[z] = command[z].replace(
            /^HOW DUZ I ([a-z\_]*)$/i,
            "function $1() {"
        ); // Start function
        command[z] = command[z].replace(
            /^HOW DUZ I ([a-z\_]*) YR ([a-z\_\ ]*)$/i,
            "function $1($2) {"
        ); // Start function
        command[z] = command[z].replace(
            /([a-z\_]*) AN YR ([a-z\_]*)/gi,
            "$1,$2"
        ); // Function vars
        command[z] = command[z].replace(/^IF U SAY SO/, "return IT; }"); // End function
        command[z] = command[z].replace(/^GTFO/, "return;"); // Return
        command[z] = command[z].replace(/^FOUND YR ([\s\S]*)/, "return $1;"); // Return result
        // Missing: Call function

        // Misc
        command[z] = command[z].replace(/^CAN HAS ([\s\S]*)/, ""); // Include libraries
        command[z] = command[z].replace(/^EXIT/, "return"); // End script

        command[z] = command[z].replace(/\:([0-9]*)\:/, "yarn[$1]"); // Load strings back in
        if (
            command[z].substr(-1) &&
            command[z].substr(-1) != "{" &&
            command[z].substr(-1) != "}" &&
            command[z].substr(-1) != ":" &&
            command[z].substr(-1) != ";"
        ) {
            command[z] = command[z] + ";";
            if (
                command[z].indexOf(" = ") < 0 &&
                command[z].indexOf("var") < 0
            ) {
                command[z] = "IT = " + command[z];
            }
        }

        output += command[z] + "\n";
    }

    return output;
}

module.exports = gololcode;
