/**
 *
 * Construct valid json rules object based on passed object.
 * It also uses adds the functionality to use `newDataRoot().` as a variable.
 *
 * type UnparsedRules
 * {
 *   "path/as/string": {
 *     "ruleKeyWithoutDot": "unparsedRuleString"
 *   }
 * }
 *
 * type RulePairs
 * [
 *   ["path/as/string", { "ruleKeyWithoutDot": "unparsedRuleString" }]
 * ]
 *
 * type RuleParsedPairs
 * [
 *   [
 *     ["path, "as, "string"],
 *     [["validRuleKeyWithDot", "parsedRuleString"]]
 *   ]
 * ]
 *
 * type ParsedRules
 * {
 *   "rules": {
 *     "path": {
 *       ".ruleKey": "parsedRuleString"
 *     }
 *   }
 * }
 *
 * type UnparsedPathRules
 * ["maybeValidRuleKeyWithoutDot", "unparsedRuleString"]
 *
 * type ParsedPathRules
 * ["validRuleKeyWithoutDot", "parsedRuleString"]
 *
 */

import map from "lodash/fp/map";
import reduce from "lodash/fp/reduce";
import filter from "lodash/fp/filter";
import set from "lodash/fp/set";
import pipe from "lodash/fp/flow";
import toPairs from "lodash/fp/toPairs";
import flip from "lodash/fp/flip";
import concat from "lodash/fp/concat";
import join from "lodash/fp/join";

// getRelativeRoot : [pathArray] -> string
const getRelativeRoot = pipe(
  map(x => "parent()."),
  flip(concat)("newData."),
  join("")
);

// Valid rules keys used by Firebase.
const validRulesKeys = [".write", ".read", ".validate", ".indexOn"];

// filterInvalidRuleKeys : [[maybeValidRuleKey, anyRuleValue]] -> [[validRuleKey, anyRuleValue]]
const filterInvalidRuleKeys = filter(
  entry => validRulesKeys.indexOf(entry[0]) !== -1
);

// 'validate' -> '.validate'
const parseRuleKey = key => (key.indexOf(".") === 0 ? key : `.${key}`);

// `newDataRoot().child('path')` -> `newData.parent().child('path')`
export const _parseRuleValue = pathArr => ruleValue => {
  const relativeRootStr = "newDataRoot().";
  const relativeRoot = getRelativeRoot(pathArr);
  return ruleValue.toString().replace(/newDataRoot\(\)\./g, relativeRoot);
};

// parsePathRules : UnparsedPathRules -> ParsedPathRules
const parsePathRules = pathArr =>
  pipe([
    toPairs,
    map(entry => [parseRuleKey(entry[0]), _parseRuleValue(pathArr)(entry[1])]),
    filterInvalidRuleKeys
  ]);

// RulePairs -> RuleParsedPairs
export const _toParsedPairs = map(entry => {
  const pathArr = entry[0].split("/").filter(x => x && !!x.length);
  return [pathArr, parsePathRules(pathArr)(entry[1])];
});

// RuleParsedPairs -> ParsedRules
export const _toParsedRules = reduce(
  (acc, pathRules) =>
    reduce(
      (acc, entry) =>
        set(["rules"].concat(pathRules[0], entry[0]), entry[1], acc),
      acc,
      pathRules[1]
    ),
  { rules: {} }
);

// buildRules : UnparsedRules : ParsedRules
export const buildRules = pipe([toPairs, _toParsedPairs, _toParsedRules]);
