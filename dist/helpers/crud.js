"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const conditions_1 = require("./conditions");
/**
 * **onCreate**
 *
 * Produces a logical test for events where the existing data does _not_ exist
 * (aka, it is being _created_).
 *
 * @param conditions additional conditions (to it being a _create_ event); they
 * will be all be wrapped with a `everyCondition` clause
 */
function onCreate(...conditions) {
    return conditions_1.everyCondition(common_1.dataDoesNotExist(), ...conditions);
}
exports.onCreate = onCreate;
/**
 * **onUpdate**
 *
 * Produces a logical test for events where the existing data and the new data
 * both exist (aka., `dataExists() && newDataExists()`); plus any additional
 * conditions you want to add to the `everyCondition` clause.
 *
 * @param conditions additional conditions you also want to test for
 */
function onUpdate(...conditions) {
    return conditions_1.everyCondition(common_1.dataExists(), common_1.newDataExists(), ...conditions);
}
exports.onUpdate = onUpdate;
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
function onDelete(...conditions) {
    return conditions_1.everyCondition(common_1.dataExists(), common_1.newDataDoesNotExist(), ...conditions);
}
exports.onDelete = onDelete;
/**
 * **onCreateOrUpdate**
 *
 * Produces a logical test for events where either the data is being created
 * for the first time or for when the data already exists and is being updated
 *
 * @param conditions additional conditions (to it being a _create_ or _update_ event); they
 * will be wrapped with an `everyCondition` clause
 */
function onCreateOrUpdate(...conditions) {
    return conditions_1.anyCondition(onCreate(...conditions), onUpdate(...conditions));
}
exports.onCreateOrUpdate = onCreateOrUpdate;
//# sourceMappingURL=crud.js.map