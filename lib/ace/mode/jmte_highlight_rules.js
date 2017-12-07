define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var JmteHighlightRules = function () {

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start": [
                {
                    token: "open",
                    regex: /\${/,
                    next: "jmte"
                },
                {defaultToken: "text"}

            ],
            "jmte": [
                {
                    token: "if.not",
                    regex: /if\s*?\!/
                },
                {
                    token: "if",
                    regex: /if/
                },
                {
                    token: "foreach",
                    regex: /foreach/
                },
                {
                    token: "end",
                    regex: /end/
                },
                {
                    token: "else",
                    regex: /else/
                },

                {token: "eq", regex: /=/},
                {token: "renderer", regex: /;/, next: "renderer"},

                {token: "close", regex: /}/, next: "start"},
                {token: "expression", regex: /\S+?/},
                {defaultToken: "ws", caseInsensitive: true}
            ],
            "renderer": [
                {token: "param.open", regex: /\(/, next: "param"},
                {token: "close", regex: /}/, next: "start"},
                {defaultToken: "renderer", caseInsensitive: true}

            ],
            "param": [
                {token: "param.close", regex: /\)/, next: "renderer"},
                {token: "close", regex: /}/, next: "start"},
                {token: "param.separator", regex: /;/},
                {token: "param.eq", regex: /=/},
                
                {defaultToken: "param", caseInsensitive: true}
            ]

        };
    };

    oop.inherits(JmteHighlightRules, TextHighlightRules);

    exports.JmteHighlightRules = JmteHighlightRules;

});