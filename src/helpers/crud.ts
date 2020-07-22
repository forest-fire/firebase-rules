import {
  dataDoesNotExist,
  dataExists,
  newDataExists,
  newDataDoesNotExist
} from "./common";
import { everyCondition, anyCondition } from "./conditions";

/**
 * **onCreate**
 *
 * Produces a logical test for events where the existing data does _not_ exist
 * (aka, it is being _created_).
 *
 * @param conditions additional conditions (to it being a _create_ event); they
 * will be all be wrapped with a `everyCondition` clause
 */
export function onCreate(...conditions: string[]) {
  return everyCondition(dataDoesNotExist(), ...conditions);
}

/**
 * **onUpdate**
 *
 * Produces a logical test for events where the existing data and the new data
 * both exist (aka., `dataExists() && newDataExists()`); plus any additional
 * conditions you want to add to the `everyCondition` clause.
 *
 * @param conditions additional conditions you also want to test for
 */
export function onUpdate(...conditions: string[]) {
  return everyCondition(dataExists(), newDataExists(), ...conditions);
}

/**
 * **onDelete**
 *
 * Produces a logical test for events where the existing data exists but the
 * new data is `null` (aka., a "delete"); plus any additional
 * conditions you want to add to the `everyCondition` clause.
 *
 * @param conditions additional conditions (to it being a _delete_ event); they
 * will be all be wrapped with a `everyCondition` clause
 */
export function onDelete(...conditions: string[]) {
  return everyCondition(dataExists(), newDataDoesNotExist(), ...conditions);
}

/**
 * **onCreateOrUpdate**
 *
 * Produces a logical test for events where either the data is being created
 * for the first time or for when the data already exists and is being updated
 *
 * @param conditions additional conditions (to it being a _create_ or _update_ event); they
 * will be wrapped with an `everyCondition` clause
 */
export function onCreateOrUpdate(...conditions: string[]): string {
  return anyCondition(onCreate(...conditions), onUpdate(...conditions))
}
