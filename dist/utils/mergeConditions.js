"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * **mergeCondition**
 *
 * Simply merge condition strings with a custom separator.
 *
 * **Examples:**
 * ```typescript
 * mergeCondition('%%')('cond1') => '(cond1)'
 * mergeCondition('%%')('cond1', 'cond2') => '(cond1) %% (cond2)'
 * ```
 */
function mergeConditions(separator) {
    if (!separator) {
        throw new Error("firebase-rules: mergeConditions must receive a separator.");
    }
    return function (...args) {
        if (args.length < 1) {
            throw new Error("firebase-rules: mergeConditions must receive at least one condition.");
        }
        return `((${args.join(`) ${separator} (`)}))`;
    };
}
exports.default = mergeConditions;
//# sourceMappingURL=mergeConditions.js.map