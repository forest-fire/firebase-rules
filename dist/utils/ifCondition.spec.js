"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifCondition_1 = require("./ifCondition");
test("ifCondition - should create ternary strings", () => {
    const result = ifCondition_1.ifCondition("a == b", "true", "false");
    expect(result).toBe("((a == b) ? (true) : (false))");
});
//# sourceMappingURL=ifCondition.spec.js.map