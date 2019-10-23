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
export declare const s: (value: string | number | boolean) => string | number | boolean;
/**
 * Converts a reference of `newData` or `newDataRoot` to
 * `data` or `root`.
 */
export declare const toData: (value: any) => any;
/**
 * Converts a reference of `data` or `root` to
 * `newData` or `newDataRoot`.
 */
export declare const toNewData: (value: any) => any;
/**
 * **data**
 *
 * returns the _value_ (aka, `data.val()`) of the current database path
 */
export declare const data: (child?: string) => string;
/**
 * returns the _value_ of the **new** data at the current database path
 */
export declare const newData: any;
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
export declare const isValue: (value: string | number | boolean, childPath?: string) => string;
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
export declare const isNewValue: (value: string | number | boolean, childPath?: string) => any;
/**
 * **dataExists**
 *
 * Tests whether there is data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
export declare const dataExists: (child?: string) => string;
/**
 * **dataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data at the given path; you may also optionally
 * provide a child path to test areas deeper than the current path.
 */
export declare const dataDoesNotExist: (child?: string) => string;
export declare const newDataExists: (child?: string) => string;
/**
 * **newDataDoesNotExist**
 *
 * Tests whether there is _a lack of_ data with the **new** data coming in; you may also
 * optionally provide a child path to test areas deeper than the current path.
 */
export declare const newDataDoesNotExist: (child?: string) => string;
/**
 * **child**
 *
 * Gets a child path from `data`.
 *
 * @param propName the property (or property path) off the current database path
 * @param newValue when `true` fn provides the **new** value based
 * on the update operation; default is `false`
 */
export declare const child: (propName: string, newValue?: boolean) => string;
/**
 * **newChild**
 *
 * Gets a child path from `newData`.
 *
 * @param propName the property (or _property path_) off the current database path
 */
export declare const newChild: (propName: string) => string;
/**
 * Tests whether `newData` is a **string**; optionally allowing
 * for the test do be done on a child property
 */
export declare const isString: (child?: string) => string;
/**
 * Tests whether `newData` is a **number**; optionally allowing
 * for the test do be done on a child property
 */
export declare const isNumber: (child?: string) => string;
/**
 * Tests whether `newData` is an **integer**; optionally allowing
 * for the test do be done on a child property
 */
export declare const isInteger: (child?: string) => string;
/**
 * Tests whether `newData` is **boolean**; optionally allowing
 * for the test do be done on a child property
 */
export declare const isBoolean: (child?: string) => string;
export declare const isNow = "newData.val() == now";
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
export declare const validate: (...conditions: string[]) => {
    validate: string;
};
export declare const indexOn: (...properties: string[]) => any;
