import { s } from "./common";

/**
 * An _alias_ for `auth.uid`
 */
export const uid = () => "auth.uid";

/**
 * Logical test that returns `true` if the user is authenticated
 * (aka, has a `uid` defined)
 */
export const isLoggedIn = () => "auth.uid != null";

/**
 * **isAuthId**
 *
 * Tests whether a particular user is logged in
 *
 * @param uid the `uid` to test for
 */
export const isUser = (uid: string) => `auth.uid == ${s(uid)}`;

/**
 * **hasCustomClaim**
 *
 * Tests whether a given claim exists on the logged in user
 *
 * @param claim the claim name which is being validated
 */
export const hasCustomClaim = (claim: string) => `auth.token.${claim} != null`;

/**
 * **customClaimValue**
 *
 * Checks a _custom claim_ to see an exact match of the value can be made. If the
 * claim is an Object then you may also want to do the checking at a "child path"
 * of the claim itself.
 *
 * @param claim the custom claim to check
 * @param value the value which you want check for
 * @param child _optionally_, the child path to the value in an object based claim value
 */
export const customClaimValue = (
  claim: string,
  value: string | boolean | number,
  child?: string
) =>
  `auth.token.${claim}${child ? ("." + child.replace(/\//g, ".")).replace(/\.(\$.+?)(?=\.|$)/g, "[$1]") : ""} === ${s(
    value
  )}`;

/**
 * **customClaimContains**
 *
 * Checks a _custom claim_ to see if a given value is contained within it. If the
 * claim is an Object then you may also want to do the checking at a "child path"
 * of the claim itself.
 *
 * @param claim the custom claim to check
 * @param value the value which you want match for
 * @param child _optionally_, the child path to the value in an object based claim value
 */
export const customClaimContains = (
  claim: string,
  value: string | boolean | number,
  child?: string
) =>
  `auth.token.${claim}${
    child ? ("." + child.replace(/\//g, ".")).replace(/\.(\$.+?)(?=\.|$)/g, "[$1]") : ""
  }.contains(${s(value)})`

/**
 * Tests if the logged in user has an email address
 */
export const hasEmail = () => `auth.token.email != null`;

/**
 * **emailMatches**
 *
 * Tests if the logged in user has an email which matches the given
 * regular expression.
 *
 * @param regEx a regular expression stated as a `string`
 */
export const emailMatches = (regEx: string) =>
  `auth.token.email.matches(${regEx})`;

/**
 * Tests if the logged in user has an email address
 */
export const hasVerifiedEmail = () => `auth.token.email_verified == true`;

/**
 * Tests if the logged in user has a phone number
 */
export const hasPhoneNumber = () => `auth.token.phone_number != null`;
