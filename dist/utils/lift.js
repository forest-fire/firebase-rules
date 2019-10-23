"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # TODO: Better naming.
 * Lifts function into a container that may execute it directly or wait for the passed function to be called.
 */
exports.lift = fn => value => {
    return typeof value !== "function"
        ? fn(value)
        : function () {
            const args = Array.from(arguments);
            return fn(value(...args));
        };
};
//# sourceMappingURL=lift.js.map