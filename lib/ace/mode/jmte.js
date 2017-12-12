/*
fdfdjfhjdf ${ huhu;renderer }

kgjfkgfjg ${yo(default)}

${ if oma.oma2;huhu }

${else }

${end}

${foreach list.data item}

${end}

${foreach list item}
var var = 10;
${item;date(yyyy.MM.dd HH:mm:ss z)}
${end}

${description;string(max=20;ellipsis)}

fdfdfd

${if    !oma = '47'}

${tosAccepted;boolean(symbol=yes/no)}
*/

define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var JmteHighlightRules = require("./jmte_highlight_rules").JmteHighlightRules;
    var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

    var Mode = function () {
        this.HighlightRules = JmteHighlightRules;

        this.$outdent = new MatchingBraceOutdent();
    };
    oop.inherits(Mode, TextMode);

    (function () {

        this.getNextLineIndent = function (state, line, tab) {
            var indent = this.$getIndent(line);
            return indent;
        };

        this.checkOutdent = function (state, line, input) {
            return this.$outdent.checkOutdent(line, input);
        };

        this.autoOutdent = function (state, doc, row) {
            this.$outdent.autoOutdent(doc, row);
        };
        this.$id = "ace/mode/jmte";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
