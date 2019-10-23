export declare const uid: () => string;
/**
 * Logical test that returns `true` if the user is authenticated
 * (aka, has a `uid` defined)
 */
export declare const isLoggedIn: () => string;
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
export declare const customClaimValue: (claim: string, value: string | number | boolean, child?: string) => string;
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
export declare const customClaimContains: (claim: string, value: string | number | boolean, child?: string) => string;
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
