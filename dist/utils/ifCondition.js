"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Increases the readability of the ternary operator.
 *
 * For instance:
 *
 * ```typescript
 * '/users/$userId/': {
 *   read: {
 *     ifCondition(
 *       userIsAuth,
 *       valueIsAuthUserId('$userId')
 *     )
 *   }
 * }
 * ```
 *
 */
function ifCondition(condition, trueOperation, elseOperation) {
    if (!condition || !trueOperation) {
        throw new Error("firebase-rules: ifCondition must receive at least a condition and a operation.");
    }
    else if (Array.from(arguments).length > 3) {
        throw new Error("firebase-rules: ifCondition is receiving too many arguments.");
    }
    else {
        return `((${condition}) ? (${trueOperation}) : (${elseOperation ||
            false}))`;
    }
}
exports.ifCondition = ifCondition;
//# sourceMappingURL=ifCondition.js.map