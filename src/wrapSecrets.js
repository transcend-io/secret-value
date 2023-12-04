"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapSecrets = void 0;
// local
const type_utils_1 = require("@transcend-io/type-utils");
const Secret_1 = require("./Secret");
/**
 * Utility function to wrap values of an object as secrets
 *
 * @param obj - The object to modify
 * @param secretKeys - The keys of the object that should be secrets
 * @returns The object with values wrapped as secrets
 */
function wrapSecrets(obj, secretKeys) {
    return (0, type_utils_1.apply)(obj, (value, key) => secretKeys.includes(key) ? new Secret_1.Secret(value) : value);
}
exports.wrapSecrets = wrapSecrets;
//# sourceMappingURL=wrapSecrets.js.map