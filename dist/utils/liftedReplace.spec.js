"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const liftedReplace_1 = require("./liftedReplace");
test("liftedReplace - it should apply multiple replacements", () => {
    expect(liftedReplace_1.liftedReplace([["a", "x"], ["b", "x"]])("ab")).toEqual("xx");
});
test("liftedReplace - it should work with functions", () => {
    expect(liftedReplace_1.liftedReplace([["a", "x"], ["b", "x"]])("ab")).toEqual("xx");
});
//# sourceMappingURL=liftedReplace.spec.js.map