"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mergeConditions_1 = __importDefault(require("./mergeConditions"));
test("mergeConditions - should create closures with the given separator", () => {
    const result = mergeConditions_1.default("||")("true", "false", "either");
    expect(result).toBe("((true) || (false) || (either))");
});
//# sourceMappingURL=mergeConditions.spec.js.map