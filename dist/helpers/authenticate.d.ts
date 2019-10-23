/**
 * Logical test that returns `true` if the user is authenticated
 * (aka, has a `uid` defined)
 */
export declare const isLoggedIn = "auth.uid != null";
/**
 * **isAuthId**
 *
 * Tests whether a particular user is logged in
 *
 * @param uid the `uid` to test for
 */
export declare const isUser: (uid: string) => string;
/**
 * **hasCustomClaim**
 *
 * Tests whether a given claim exists on the logged in user
 *
 * @param claim the claim name which is being validated
 */
export declare const hasCustomClaim: (claim: string) => string;
/**
 * Tests if the logged in user has an email address
 */
export declare const hasEmail: () => string;
/**
 * **emailMatches**
 *
 * Tests if the logged in user has an email which matches the given
 * regular expression.
 *
 * @param regEx a regular expression stated as a `string`
 */
export declare const emailMatches: (regEx: string) => string;
/**
 * Tests if the logged in user has an email address
 */
export declare const hasVerifiedEmail: () => string;
/**
 * Tests if the logged in user has a phone number
 */
export declare const hasPhoneNumber: () => string;
