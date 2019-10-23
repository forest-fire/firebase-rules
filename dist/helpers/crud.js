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
 * will be all be wrapped with a `everyCondition` claus
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
 * conditions you want to add to the `everyCondition` claus.
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
 * conditions you want to add to the `everyCondition` claus.
 *
 * @param conditions additional conditions (to it being a _create_ event); they
 * will be all be wrapped with a `everyCondition` claus
 */
function onDelete(...conditions) {
    return conditions_1.everyCondition(common_1.dataExists(), common_1.newDataDoesNotExist(), ...conditions);
}
exports.onDelete = onDelete;
//# sourceMappingURL=crud.js.map