import mergeConditions from "../utils/mergeConditions";

export const anyCondition = mergeConditions("||");
export const everyCondition = mergeConditions("&&");
