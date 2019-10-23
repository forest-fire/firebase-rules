/**
 * Logical test that returns `true` if the user is authenticated
 * (aka, has a `uid` defined)
 */
export const isLoggedIn = "auth.uid != null";

/**
 * **isAuthId**
 *
 * Tests whether a particular user is logged in
 *
 * @param uid the `uid` to test for
 */
export const isUser = (uid: string) => `auth.uid == ${uid}`;

/**
 * **hasCustomClaim**
 *
 * Tests whether a given claim exists on the logged in user
 *
 * @param claim the claim name which is being validated
 */
export const hasCustomClaim = (claim: string) => `auth.token.${claim} == true`;

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
