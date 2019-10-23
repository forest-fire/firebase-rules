import { ifOrElse } from "./ifOrElse";

test("ifCondition - should create ternary strings", () => {
  const result = ifOrElse("a == b", "true", "false");
  expect(result).toBe("((a == b) ? (true) : (false))");
});
