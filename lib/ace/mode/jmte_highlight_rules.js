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
                    token: "jmte.open",
                    regex: /\${/,
                    next: "jmte"
                },
                {defaultToken: "text"}

            ],
            "jmte": [
                {
                    token: "jmte.if.not",
                    regex: /if\s*?\!/
                },
                {
                    token: "jmte.if",
                    regex: /if/
                },
                {
                    token: "jmte.foreach",
                    regex: /foreach/
                },
                {
                    token: "jmte.end",
                    regex: /end/
                },
                {
                    token: "jmte.else",
                    regex: /else/
                },

                {token: "jmte.eq", regex: /=/},
                {token: "jmte.renderer", regex: /;/, next: "renderer"},
                {token: "jmte.default", regex: /\(.*?\)/},

                {token: "jmte.close", regex: /}/, next: "start"},
                {token: "jmte.expression", regex: /\S+?/},
                {defaultToken: "jmte.ws", caseInsensitive: true}
            ],
            "renderer": [
                {token: "jmte.param.open", regex: /\(/, next: "param"},
                {token: "jmte.close", regex: /}/, next: "start"},
                {defaultToken: "rjmte.enderer", caseInsensitive: true}

            ],
            "param": [
                {token: "jmte.param.close", regex: /\)/, next: "renderer"},
                {token: "jmte.close", regex: /}/, next: "start"},
                {token: "jmte.param.separator", regex: /;/},
                {token: "jmte.param.eq", regex: /=/},
                
                {defaultToken: "jmte.param", caseInsensitive: true}
            ]

        };
    };

    oop.inherits(JmteHighlightRules, TextHighlightRules);

    exports.JmteHighlightRules = JmteHighlightRules;

});