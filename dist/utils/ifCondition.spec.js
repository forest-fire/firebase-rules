"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifOrElse_1 = require("./ifOrElse");
test("ifCondition - should create ternary strings", () => {
    const result = ifOrElse_1.ifOrElse("a == b", "true", "false");
    expect(result).toBe("((a == b) ? (true) : (false))");
});
//# sourceMappingURL=ifCondition.spec.js.map