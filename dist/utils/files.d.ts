import { IDictionary } from "common-types";
export declare function readJson(filename: string): Promise<string>;
export declare function writeJson(filename: string, rules: IDictionary, spaces?: number): Promise<void>;
