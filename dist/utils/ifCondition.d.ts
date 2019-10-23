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
export declare function ifCondition(condition: any, trueOperation: any, elseOperation: any): string;
