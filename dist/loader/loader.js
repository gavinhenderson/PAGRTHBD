// import { getOptions } from "loader-utils";
// import validateOptions from "schema-utils";
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@babel/parser"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.raw = void 0;
    // const schema = {
    //   type: "object",
    //   properties: {
    //     test: {
    //       type: "string",
    //     },
    //   },
    // };
    // THINGS THAT WILL BREAK
    // export const a = 1, b=2
    // const myThing = 'test'
    // export {myThing}
    var parser_1 = require("@babel/parser");
    function default_1(source) {
        // const options = getOptions(this);
        // validateOptions(schema, options, "Example Loader");
        var parsedCode = parser_1.parse(source.toString(), { sourceType: "module" });
        var nodes = parsedCode.program.body.filter(function (_a) {
            var type = _a.type, declaration = _a.declaration;
            return type === "ExportNamedDeclaration" && declaration !== null;
        });
        var funcNames = nodes.map(function (_a) {
            var declaration = _a.declaration;
            return declaration.declarations[0].id.name;
        });
        var output = "";
        for (var _i = 0, funcNames_1 = funcNames; _i < funcNames_1.length; _i++) {
            var func = funcNames_1[_i];
            output += "\n        export const " + func + " = async () => {\n            // Do fetch shit\n            console.log('" + func + "')           \n        }\n      ";
        }
        // console.log(parsedCode.program.body);
        // const decleration = parsedCode.program.body[1] as any;
        // console.log(decleration.specifiers);
        // const file = new Function(source)();
        return output;
    }
    exports["default"] = default_1;
    exports.raw = true;
});
//# sourceMappingURL=loader.js.map