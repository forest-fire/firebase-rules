import * as path from "path";
import { readFile, writeFile } from "fs";
import { promisify } from "util";
import { IDictionary } from "common-types";
const read = promisify(readFile);
const write = promisify(writeFile);

export async function readJson(filename: string) {
  let fullPath: string;
  let data: string;
  try {
    fullPath = path.resolve(process.cwd(), filename);
    data = await read(fullPath, { encoding: "utf-8" });
  } catch (e) {
    const err = new Error(
      `There was a problem reading the file ${filename}: ${e.message}`
    );
    err.stack = e.stack;
    err.name = e.name;
    throw err;
  }

  try {
    return JSON.stringify(data);
  } catch (e) {
    const err = new Error(
      `There was a problem parsing the data in ${filename}: ${e.message}`
    );
    err.stack = e.stack;
    err.name = e.name;
    throw err;
  }
}

export async function writeJson(
  filename: string,
  rules: IDictionary,
  spaces: number = 2
) {
  let fullPath: string = path.resolve(process.cwd(), filename);
  let data: string;
  try {
    data = JSON.stringify(rules, null, spaces);
  } catch (e) {
    const err = new Error(
      `There was a problem stringifying the rules: ${e.message}`
    );
    err.stack = e.stack;
    err.name = e.name;
    throw err;
  }

  try {
    await write(fullPath, data, { encoding: "utf-8" });
  } catch (e) {
    const err = new Error(
      `There was a problem writing the data to "${filename}": ${e.message}`
    );
    err.stack = e.stack;
    err.name = e.name;
    throw err;
  }
}
