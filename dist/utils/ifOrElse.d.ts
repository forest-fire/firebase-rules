/**
 *
 * Increases the readability of the ternary operator.
 *
 * For instance:
 *
 * ```typescript
 * '/users/$userId/': {
 *   read: {
 *     ifOrElse(
 *       userIsAuth,
 *       valueIsAuthUserId('$userId')
 *     )
 *   }
 * }
 * ```
 *
 */
export declare function ifOrElse(condition: string, trueOperation: string, elseOperation: string | false): string;
