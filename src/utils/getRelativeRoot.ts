/**
 *
 * Calculate the number of parents needed to reach the newData root path.
 *
 */
export function getRelativeRoot(pathArr) {
  const depth = pathArr.length;
  let rootStr = "newData.";
  for (var i = 0; i < depth; i++) {
    rootStr += "parent().";
  }
  return rootStr;
}
