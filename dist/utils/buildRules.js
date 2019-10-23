"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("lodash/fp/map"));
const reduce_1 = __importDefault(require("lodash/fp/reduce"));
const filter_1 = __importDefault(require("lodash/fp/filter"));
const set_1 = __importDefault(require("lodash/fp/set"));
const flow_1 = __importDefault(require("lodash/fp/flow"));
const toPairs_1 = __importDefault(require("lodash/fp/toPairs"));
const flip_1 = __importDefault(require("lodash/fp/flip"));
const concat_1 = __importDefault(require("lodash/fp/concat"));
const join_1 = __importDefault(require("lodash/fp/join"));
// getRelativeRoot : [pathArray] -> string
const getRelativeRoot = flow_1.default(map_1.default(x => "parent()."), flip_1.default(concat_1.default)("newData."), join_1.default(""));
// Valid rules keys used by Firebase.
const validRulesKeys = [".write", ".read", ".validate", ".indexOn"];
// filterInvalidRuleKeys : [[maybeValidRuleKey, anyRuleValue]] -> [[validRuleKey, anyRuleValue]]
const filterInvalidRuleKeys = filter_1.default(entry => validRulesKeys.indexOf(entry[0]) !== -1);
// 'validate' -> '.validate'
const parseRuleKey = key => (key.indexOf(".") === 0 ? key : `.${key}`);
// `newDataRoot().child('path')` -> `newData.parent().child('path')`
exports._parseRuleValue = pathArr => ruleValue => {
    const relativeRootStr = "newDataRoot().";
    const relativeRoot = getRelativeRoot(pathArr);
    return ruleValue.toString().replace(/newDataRoot\(\)\./g, relativeRoot);
};
// parsePathRules : UnparsedPathRules -> ParsedPathRules
const parsePathRules = pathArr => flow_1.default([
    toPairs_1.default,
    map_1.default(entry => [parseRuleKey(entry[0]), exports._parseRuleValue(pathArr)(entry[1])]),
    filterInvalidRuleKeys
]);
// RulePairs -> RuleParsedPairs
exports._toParsedPairs = map_1.default(entry => {
    const pathArr = entry[0].split("/").filter(x => x && !!x.length);
    return [pathArr, parsePathRules(pathArr)(entry[1])];
});
// RuleParsedPairs -> ParsedRules
exports._toParsedRules = reduce_1.default((acc, pathRules) => reduce_1.default((acc, entry) => set_1.default(["rules"].concat(pathRules[0], entry[0]), entry[1], acc), acc, pathRules[1]), { rules: {} });
// buildRules : UnparsedRules : ParsedRules
exports.buildRules = flow_1.default([toPairs_1.default, exports._toParsedPairs, exports._toParsedRules]);
//# sourceMappingURL=buildRules.js.map