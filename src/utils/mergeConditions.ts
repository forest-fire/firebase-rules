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
export default function mergeConditions(separator: string) {
  if (!separator) {
    throw new Error(
      "firebase-rules: mergeConditions must receive a separator."
    );
  }
  return function(...args: string[]) {
    if (args.length < 1) {
      throw new Error(
        "firebase-rules: mergeConditions must receive at least one condition."
      );
    }
    return `((${args.join(`) ${separator} (`)}))`;
  };
}
