"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lift_1 = require("./lift");
const replaceMultiple = replacements => target => replacements.reduce((acc, args) => {
    return acc.replace(args[0], args[1]);
}, target);
function liftedReplace(replacements) {
    return lift_1.lift(replaceMultiple(replacements));
}
exports.liftedReplace = liftedReplace;
//# sourceMappingURL=liftedReplace.js.map