"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const liftFunction_1 = require("./liftFunction");
const replaceMultiple = replacements => target => replacements.reduce((acc, args) => {
    return acc.replace(args[0], args[1]);
}, target);
function liftedReplace(replacements) {
    return liftFunction_1.lift(replaceMultiple(replacements));
}
exports.liftedReplace = liftedReplace;
//# sourceMappingURL=liftedReplace.js.map