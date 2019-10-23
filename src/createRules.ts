import { buildRules } from "./utils/buildRules";
import { IDictionary } from "common-types";
import { writeJson } from "./utils/files";

/**
 * **createRules**
 *
 * Creates a JSON rule structure from _Rules dictionary_ that can be used by
 * **Firebase**. This function will always return the JSON structure but if a
 * _filepath_ is included it will also write the JSON to the filesystem.
 */
export function createRules(rules: IDictionary, filepath?: string): string {
  const builtRules = buildRules(rules);
  if (filepath) writeJson(filepath, builtRules).catch(console.log);

  return builtRules;
}
