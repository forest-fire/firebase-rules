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
export function jsonArr(
  arr,
  showEmpty: boolean = false,
  throwError: boolean = true
) {
  if (!arr || !arr.length) {
    if (throwError) {
      throw new Error(
        "firebase-rules: arrToJson - must receive an array with at least one item."
      );
      return "";
    } else {
      return showEmpty ? "[]" : "";
    }
  }

  return arr.reduce((acc, item, index) => {
    const end = index < arr.length - 1 ? ", " : "]";
    return acc + "'" + item + "'" + end;
  }, "[");
}
