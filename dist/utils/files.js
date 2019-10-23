"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs_1 = require("fs");
const util_1 = require("util");
const read = util_1.promisify(fs_1.readFile);
const write = util_1.promisify(fs_1.writeFile);
async function readJson(filename) {
    let fullPath;
    let data;
    try {
        fullPath = path.resolve(process.cwd(), filename);
        data = await read(fullPath, { encoding: "utf-8" });
    }
    catch (e) {
        const err = new Error(`There was a problem reading the file ${filename}: ${e.message}`);
        err.stack = e.stack;
        err.name = e.name;
        throw err;
    }
    try {
        return JSON.stringify(data);
    }
    catch (e) {
        const err = new Error(`There was a problem parsing the data in ${filename}: ${e.message}`);
        err.stack = e.stack;
        err.name = e.name;
        throw err;
    }
}
exports.readJson = readJson;
async function writeJson(filename, rules, spaces = 2) {
    let fullPath = path.resolve(process.cwd(), filename);
    let data;
    try {
        data = JSON.stringify(rules, null, spaces);
    }
    catch (e) {
        const err = new Error(`There was a problem stringifying the rules: ${e.message}`);
        err.stack = e.stack;
        err.name = e.name;
        throw err;
    }
    try {
        await write(fullPath, data, { encoding: "utf-8" });
    }
    catch (e) {
        const err = new Error(`There was a problem writing the data to "${filename}": ${e.message}`);
        err.stack = e.stack;
        err.name = e.name;
        throw err;
    }
}
exports.writeJson = writeJson;
//# sourceMappingURL=files.js.map