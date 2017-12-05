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

                {token: "renderer", regex: /;/, next: "renderer"},

                {token: "close", regex: /}/, next: "start"},
                {token: "expression", regex: /\S+/},
                {defaultToken: "ws", caseInsensitive: true}
            ],
            "renderer": [
                {token: "close", regex: /}/, next: "start"},
                {defaultToken: "renderer", caseInsensitive: true}

            ]

        };
    };

    function jmte(next) {
        return [
            {
                token: "jmte.if",
                regex: /\s*if\s*/,
                next: [
                    {token: "jmte.renderer", regex: /\;[^\}]*/},
                    {token: "jmte.close", regex: /\}/, next: next || "pop"},
                    {defaultToken: "jmte.expression", caseInsensitive: true}
                ]
            },
            {
                token: "jmte.foreach",
                regex: /\s*foreach\s*/,
                next: [
                    {token: "jmte.expression", regex: /\S*/},
                    {token: "jmte.close", regex: /\}/, next: next || "pop"},
                    {defaultToken: "jmte.variable", caseInsensitive: true}
                ]
            },
            {
                token: "jmte.end",
                regex: /\s*end/,
                next: [
                    {token: "jmte.close", regex: /\}/, next: next || "pop"},
                    {defaultToken: "jmte.end", caseInsensitive: true}
                ]
            },
            {
                token: "jmte.else",
                regex: /\s*else/,
                next: [
                    {token: "jmte.close", regex: /\}/, next: next || "pop"},
                    {defaultToken: "jmte.else", caseInsensitive: true}
                ]
            },
            {
                token: "jmte.expression",
                regex: /.*?/,
                next: [
                    {token: "jmte.renderer", regex: /\;[^\}]*/},
                    {token: "jmte.default", regex: /\(.*?\)/},
                    {token: "jmte.close", regex: /\}/, next: next || "pop"},
                    {defaultToken: "jmte.expression", caseInsensitive: true}
                ]
            }
        ];
    }

    oop.inherits(JmteHighlightRules, TextHighlightRules);

    exports.JmteHighlightRules = JmteHighlightRules;

});