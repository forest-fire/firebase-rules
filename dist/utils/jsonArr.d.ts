/**
 *
 * Returns a json compatible string from an array.
 *
 * An empty string or a representation of an empty array can also be returned for empty values.
 * If throwError is set to true, it throws an error on either an empty array or a falsy value.
 *
 * **Examples:**
 * ```typescript
 * jsonArr([1, 3, 'something']) => '[\'1\', \'3\', \'something\']'
 * jsonArr([]) => ''
 * jsonArr([], true) => '[]'
 * jsonArr([], true, true) => ERROR
 * ```
 */
export declare function jsonArr(arr: any, showEmpty?: boolean, throwError?: boolean): any;
