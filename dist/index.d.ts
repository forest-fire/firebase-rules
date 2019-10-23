import { IDictionary } from "common-types";
/**
 * **createRules**
 *
 * Creates a JSON rule structure from _Rules dictionary_ that can be used by
 * **Firebase**. This function will always return the JSON structure but if a
 * _filepath_ is included it will also write the JSON to the filesystem.
 */
export declare function createRules(rules: IDictionary, filepath?: string): string;
