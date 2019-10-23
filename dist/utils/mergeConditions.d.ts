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
export default function mergeConditions(separator: string): (...args: string[]) => string;
