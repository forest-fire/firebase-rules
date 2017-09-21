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

const map = require('lodash/fp/map');
const reduce = require('lodash/fp/reduce');
const filter = require('lodash/fp/filter');
const set = require('lodash/fp/set');
const pipe = require('lodash/fp/flow');
const toPairs = require('lodash/fp/toPairs');

const validRulesKeys = require('../constants/validRulesKeys');
const getRelativeRoot = require('./getRelativeRoot');

// filterInvalidRuleKeys : [[maybeValidRuleKey, anyRuleValue]] -> [[validRuleKey, anyRuleValue]]
const filterInvalidRuleKeys = filter(
  entry => validRulesKeys.indexOf(entry[0]) !== -1
);

// 'validate' -> '.validate'
const parseRuleKey = key => `.${key}`;

// `newDataRoot().child('path')` -> `newData.parent().child('path')`
const parseRuleValue = pathArr => ruleValue => {
  const relativeRootStr = 'newDataRoot().';
  const relativeRoot = getRelativeRoot(pathArr);
  return ruleValue.toString().replace(/newDataRoot\(\)\./g, relativeRoot);
};

// parsePathRules : UnparsedPathRules -> ParsedPathRules
const parsePathRules = pathArr =>
  pipe([
    toPairs,
    filterInvalidRuleKeys,
    map(entry => [parseRuleKey(entry[0]), parseRuleValue(pathArr)(entry[1])])
  ]);

// RulePairs -> RuleParsedPairs
const toParsedPairs = map(entry => {
  const pathArr = entry[0].split('/').filter((x) => x && !!x.length);
  return [pathArr, parsePathRules(pathArr)(entry[1])];
});

// RuleParsedPairs -> ParsedRules
const toParsedRules = reduce(
  (acc, pathRules) => reduce(
    (acc, entry) => set(['rules'].concat(pathRules[0], entry[0]), entry[1], acc),
    acc,
    pathRules[1]
  ),
  { rules: {} }
);

// buildRules : UnparsedRules : ParsedRules
const buildRules = pipe([toPairs, toParsedPairs, toParsedRules]);

module.exports = {
  buildRules,
  _toParsedPairs: toParsedPairs,
  _parseRuleValue: parseRuleValue,
  _toParsedRules: toParsedRules
};
