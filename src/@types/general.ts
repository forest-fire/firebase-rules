export interface ISecurityRule {
  read?: string | boolean;
  write?: string | boolean;
  validate?: string;
  query?: string;
  indexOn?: string | string[];
}
