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
export declare const _parseRuleValue: (pathArr: any) => (ruleValue: any) => any;
export declare const _toParsedPairs: import("lodash/fp").LodashMap1x1<unknown, any[]>;
export declare const _toParsedRules: import("lodash/fp").LodashReduce1x3<unknown, {
    rules: {};
}>;
export declare const buildRules: (...args: any[]) => any;
