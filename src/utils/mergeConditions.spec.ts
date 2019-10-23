import mergeConditions from "./mergeConditions";

test("mergeConditions - should create closures with the given separator", () => {
  const result = mergeConditions("||")("true", "false", "either");
  expect(result).toBe("((true) || (false) || (either))");
});
