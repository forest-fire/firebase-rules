"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lift_1 = require("./lift");
test("liftFunction - when passed a normal value - it should execute the first function at once", () => {
    const result = lift_1.lift(x => x + 1)(1);
    expect(result).toBe(2);
});
test("liftFunction - when passed a function value - it should execute the first function on the result of the passed function", () => {
    const result = lift_1.lift(x => x + 1)(() => 1);
    expect(typeof result === "function").toBe(true);
    expect(result()).toBe(2);
});
//# sourceMappingURL=liftFunction.spec.js.map