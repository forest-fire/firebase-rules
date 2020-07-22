export interface ISecurityRule {
    read?: string | boolean;
    write?: string | boolean;
    validate?: string | boolean;
    query?: string;
    indexOn?: string | string[];
}
