"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildRules_1 = require("./utils/buildRules");
const files_1 = require("./utils/files");
/**
 * **createRules**
 *
 * Creates a JSON rule structure from _Rules dictionary_ that can be used by
 * **Firebase**. This function will always return the JSON structure but if a
 * _filepath_ is included it will also write the JSON to the filesystem.
 */
function createRules(rules, filepath) {
    const builtRules = buildRules_1.buildRules(rules);
    if (filepath)
        files_1.writeJson(filepath, builtRules).catch(console.log);
    return builtRules;
}
exports.createRules = createRules;
//# sourceMappingURL=createRules.js.map