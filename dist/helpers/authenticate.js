"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.uid = () => "auth.uid";
/**
 * Logical test that returns `true` if the user is authenticated
 * (aka, has a `uid` defined)
 */
exports.isLoggedIn = () => "auth.uid != null";
/**
 * **isAuthId**
 *
 * Tests whether a particular user is logged in
 *
 * @param uid the `uid` to test for
 */
exports.isUser = (uid) => `auth.uid == ${common_1.s(uid)}`;
/**
 * **hasCustomClaim**
 *
 * Tests whether a given claim exists on the logged in user
 *
 * @param claim the claim name which is being validated
 */
exports.hasCustomClaim = (claim) => `auth.token.${claim} != null`;
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
exports.customClaimValue = (claim, value, child) => `auth.token.${claim}.${child ? child.replace(/\//, child) + "." : ""} == ${common_1.s(value)}`;
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
exports.customClaimContains = (claim, value, child) => `auth.token.${claim}.${child ? child.replace(/\//, child) + "." : ""} == ${common_1.s(value)}`;
/**
 * Tests if the logged in user has an email address
 */
exports.hasEmail = () => `auth.token.email != null`;
/**
 * **emailMatches**
 *
 * Tests if the logged in user has an email which matches the given
 * regular expression.
 *
 * @param regEx a regular expression stated as a `string`
 */
exports.emailMatches = (regEx) => `auth.token.email.matches(${regEx})`;
/**
 * Tests if the logged in user has an email address
 */
exports.hasVerifiedEmail = () => `auth.token.email_verified == true`;
/**
 * Tests if the logged in user has a phone number
 */
exports.hasPhoneNumber = () => `auth.token.phone_number != null`;
//# sourceMappingURL=authenticate.js.map