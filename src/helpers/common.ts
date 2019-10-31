import { liftedReplace } from "../utils/liftedReplace";
import { jsonArr } from "../utils/jsonArr";
import { everyCondition } from "./conditions";

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
export const s = (value: string | boolean | number) =>
  typeof value === "string" ? `\'${value}\'` : value;

//#region TRANSFORMATIONS
/**
 * Converts a reference of `newData` or `newDataRoot` to
 * `data` or `root`.
 */
export const toData = liftedReplace([
  [/newData\./g, "data."],
  [/newDataRoot\(\)\./, "root."]
]);

/**
 * Converts a reference of `data` or `root` to
 * `newData` or `newDataRoot`.
 */
export const toNewData = liftedReplace([
  [/data\./g, "newData."],
  [/root\./, "newDataRoot()."]
]);

//#endregion

//#region DATA

/**
 * returns the _value_ at the specified path from the root of the database
 */
export const root = (child?: string) =>
  `root.${child ? `child('${child}').` : ""}val()`;

/**
 * **data**
 *
 * returns the _value_ (aka, `data.val()`) of the current database path
 */
export const data = (child?: string) =>
  `data.${child ? `child('${child}').` : ""}val()`;

/**
 * returns the _value_ of the **new** data at the current database path
 */
export const newData = toNewData(data);

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
export const isValue = (value: string | number | boolean, childPath?: string) =>
  childPath
    ? `data.val() == ${typeof value === "string" ? s(value) : value}`
    : `data.val() == ${typeof value === "string" ? s(value) : value}`;

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
export const isNewValue = (
  value: string | number | boolean,
  childPath?: string
) => toNewData(isValue(value, childPath));

function _exists(
  child: string = undefined,
  isNewData: boolean,
  inverse: boolean
) {
  return child
    ? `${isNewData ? "newData" : "data"}.child('${child}').val() ${
        inverse ? "==" : "!="
      } null`
    : `${isNewData ? "newData" : "data"}.val() ${inverse ? "==" : "!="} null`;
}

/**
 * **dataExists**
 *
 * Tests whether there is data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
export const dataExists = (child?: string) => _exists(child, false, false);

/**
 * **dataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
export const dataDoesNotExist = (child?: string) => _exists(child, false, true);

/**
 * **newDataExists**
 *
 * Tests whether there is data at the given path of **newData**; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
export const newDataExists = (child?: string) => _exists(child, true, false);

/**
 * **newDataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data with the **new** data coming in; you may also
 * optionally provide a child path to test areas deeper than the current path.
 */
export const newDataDoesNotExist = (child?: string) =>
  _exists(child, true, true);

/**
 * **child**
 *
 * Gets a child path from `data`.
 *
 * @param propName the property (or property path) off the current database path
 * @param newValue when `true` fn provides the **new** value based
 * on the update operation; default is `false`
 */
export const child = (propName: string, newValue: boolean = false) =>
  `data.child(\'${propName}\')`;

/**
 * **newChild**
 *
 * Gets a child path from `newData`.
 *
 * @param propName the property (or _property path_) off the current database path
 */
export const newChild = (propName: string) => child(propName, true);

//#endregion DATA

/**
 * **hasChildren**
 *
 * Checks the _new_ data for whether it has a given set of
 * properties.
 *
 * @param children the child nodes which you are checking
 */
const hasChildren = (...children: string[]) =>
  `newData.hasChildren(${jsonArr(children)})`;

/**
 * Tests whether `newData` is a **string**; optionally allowing
 * for the test do be done on a child property
 */
export const isString = (child?: string) =>
  `newData.${child ? `child('${child}').` : ""}isString()`;

/**
 * Tests whether `newData` is a **number**; optionally allowing
 * for the test do be done on a child property
 */
export const isNumber = (child?: string) =>
  `newData.${child ? `child('${child}').` : ""}isNumber()`;

/**
 * Tests whether `newData` is an **integer**; optionally allowing
 * for the test do be done on a child property
 */
export const isInteger = (child?: string) =>
  `newData.${child ? `child('${child}').` : ""}val().matches(/^-?d+$/)`;

/**
 * Tests whether `newData` is **boolean**; optionally allowing
 * for the test do be done on a child property
 */
export const isBoolean = (child?: string) =>
  `newData.${child ? `child('${child}').` : ""}isBoolean()`;

export const isNow = "newData.val() == now";

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
export const validate = (...conditions: string[]) => ({
  validate: everyCondition(...conditions)
});

// TODO: analyize this a bit more
export const indexOn = (...properties: string[]) =>
  jsonArr(properties, false, true);
