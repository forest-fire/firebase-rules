import { lift } from "./lift";

const replaceMultiple = replacements => target =>
  replacements.reduce((acc, args) => {
    return acc.replace(args[0], args[1]);
  }, target);

export function liftedReplace(replacements) {
  return lift(replaceMultiple(replacements));
}
