"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const liftedReplace_1 = require("../utils/liftedReplace");
const jsonArr_1 = require("../utils/jsonArr");
const conditions_1 = require("./conditions");
/**
 * JSON String helpers
 */
/**
 * a string helper; strings passed into the function are ensured to have string
 * quotation marks whereas other variable types are left untouched.
 *
 * **Example:**
 * ```typescript
 * const aString = s('a day in the life');        // \'a day in the life\'
 * const aNumber = s(456);                        // 456
 * const aStringVar = s('$myVariable/foobar');    // \'$myVariable/foobar\'
 * const aBoolean = s(false);                     // false
 * ```
 */
exports.s = (value) => typeof value === "string" ? `\'${value}\'` : value;
//#region TRANSFORMATIONS
/**
 * Converts a reference of `newData` or `newDataRoot` to
 * `data` or `root`.
 */
exports.toData = liftedReplace_1.liftedReplace([
    [/newData\./g, "data."],
    [/newDataRoot\(\)\./, "root."]
]);
/**
 * Converts a reference of `data` or `root` to
 * `newData` or `newDataRoot`.
 */
exports.toNewData = liftedReplace_1.liftedReplace([
    [/data\./g, "newData."],
    [/root\./, "newDataRoot()."]
]);
//#endregion
//#region DATA
/**
 * returns the _value_ at the specified path from the root of the database
 */
exports.root = (child) => `root.${child ? `child('${child}').` : ""}val()`;
/**
 * **data**
 *
 * returns the _value_ (aka, `data.val()`) of the current database path
 */
exports.data = (child) => `data.${child ? `child('${child}').` : ""}val()`;
/**
 * returns the _value_ of the **new** data at the current database path
 */
exports.newData = exports.toNewData(exports.data);
/**
 * **isValue**
 *
 * Tests whether the current path's _value_ is equal to the value
 * passed in. Optionally you can also specify a _child path_ to do
 * the test on.
 *
 * @param value the value to test for
 * @param childPath the optional child path
 */
exports.isValue = (value, childPath) => childPath
    ? `data.val() == ${typeof value === "string" ? exports.s(value) : value}`
    : `data.val() == ${typeof value === "string" ? exports.s(value) : value}`;
/**
 * **isNewValue**
 *
 * Tests whether the current path's _new value_ is equal to the value
 * passed in. Optionally you can also specify a _child path_ to do
 * the test on.
 *
 * @param value the value to test for
 * @param childPath the optional child path
 */
exports.isNewValue = (value, childPath) => exports.toNewData(exports.isValue(value, childPath));
function _exists(child = undefined, isNewData, inverse) {
    return child
        ? `${isNewData ? "newData" : "data"}.child('${child}').val() ${inverse ? "==" : "!="} null`
        : `${isNewData ? "newData" : "data"}.val() ${inverse ? "==" : "!="} null`;
}
/**
 * **dataExists**
 *
 * Tests whether there is data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
exports.dataExists = (child) => _exists(child, false, false);
/**
 * **dataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
exports.dataDoesNotExist = (child) => _exists(child, false, true);
/**
 * **newDataExists**
 *
 * Tests whether there is data at the given path of **newData**; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
exports.newDataExists = (child) => _exists(child, true, false);
/**
 * **newDataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data with the **new** data coming in; you may also
 * optionally provide a child path to test areas deeper than the current path.
 */
exports.newDataDoesNotExist = (child) => _exists(child, true, true);
/**
 * **child**
 *
 * Gets a child path from `data`.
 *
 * @param propName the property (or property path) off the current database path
 * @param newValue when `true` fn provides the **new** value based
 * on the update operation; default is `false`
 */
exports.child = (propName, newValue = false) => `data.child(\'${propName}\')`;
/**
 * **newChild**
 *
 * Gets a child path from `newData`.
 *
 * @param propName the property (or _property path_) off the current database path
 */
exports.newChild = (propName) => exports.child(propName, true);
//#endregion DATA
/**
 * **hasChildren**
 *
 * Checks the _new_ data for whether it has a given set of
 * properties.
 *
 * @param children the child nodes which you are checking
 */
const hasChildren = (...children) => `newData.hasChildren(${jsonArr_1.jsonArr(children)})`;
/**
 * Tests whether `newData` is a **string**; optionally allowing
 * for the test do be done on a child property
 */
exports.isString = (child) => `newData.${child ? `child('${child}').` : ""}isString()`;
/**
 * Tests whether `newData` is a **number**; optionally allowing
 * for the test do be done on a child property
 */
exports.isNumber = (child) => `newData.${child ? `child('${child}').` : ""}isNumber()`;
/**
 * Tests whether `newData` is an **integer**; optionally allowing
 * for the test do be done on a child property
 */
exports.isInteger = (child) => `newData.${child ? `child('${child}').` : ""}val().matches(/^-?d+$/)`;
/**
 * Tests whether `newData` is **boolean**; optionally allowing
 * for the test do be done on a child property
 */
exports.isBoolean = (child) => `newData.${child ? `child('${child}').` : ""}isBoolean()`;
exports.isNow = "newData.val() == now";
/**
 * **validate**
 *
 * A shorthand for the `validation` property.
 *
 * Example:
 * ```typescript
 * validate(isInteger('age'), isString('desc'))
 * ```
 *
 * @param conditions aconditions which are wrapped into an
 * `everyCondition` claus.
 */
exports.validate = (...conditions) => ({
    validate: conditions_1.everyCondition(...conditions)
});
// TODO: analyize this a bit more
exports.indexOn = (...properties) => jsonArr_1.jsonArr(properties, false, true);
//# sourceMappingURL=common.js.map