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
export function ifOrElse(
  condition: string,
  trueOperation: string,
  elseOperation: string | false
) {
  if (!condition || !trueOperation) {
    throw new Error(
      "firebase-rules: ifCondition must receive at least a condition and a operation."
    );
  } else if (Array.from(arguments).length > 3) {
    throw new Error(
      "firebase-rules: ifCondition is receiving too many arguments."
    );
  } else {
    return `((${condition}) ? (${trueOperation}) : (${elseOperation ||
      false}))`;
  }
}
