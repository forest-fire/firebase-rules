/**
 * **onCreate**
 *
 * Produces a logical test for events where the existing data does _not_ exist
 * (aka, it is being _created_).
 *
 * @param conditions additional conditions (to it being a _create_ event); they
 * will be all be wrapped with a `everyCondition` claus
 */
export declare function onCreate(...conditions: string[]): string;
/**
 * **onUpdate**
 *
 * Produces a logical test for events where the existing data and the new data
 * both exist (aka., `dataExists() && newDataExists()`); plus any additional
 * conditions you want to add to the `everyCondition` claus.
 *
 * @param conditions additional conditions you also want to test for
 */
export declare function onUpdate(...conditions: string[]): string;
/**
 * **onDelete**
 *
 * Produces a logical test for events where the existing data exists but the
 * new data is `null` (aka., a "delete"); plus any additional
 * conditions you want to add to the `everyCondition` claus.
 *
 * @param conditions additional conditions (to it being a _create_ event); they
 * will be all be wrapped with a `everyCondition` claus
 */
export declare function onDelete(...conditions: string[]): string;
