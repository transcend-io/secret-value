"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretValue = void 0;
const Either_1 = require("fp-ts/lib/Either");
const pipeable_1 = require("fp-ts/lib/pipeable");
const t = __importStar(require("io-ts"));
const type_utils_1 = require("@transcend-io/type-utils");
/**
 * Sometimes we want to add context to the event manager but not log that
 * context to console. To do so, wrap the variable in
 * import('@transcend-io/secret-value').Secret:
 *
 * ```ts
 * public toContext(): { user: UserLogContext; } {
 *  return {
 *     user: {
 *       id: this.id,
 *       name: new Secret(this.name),
 *       email: new Secret(this.email),
 *     },
 *   };
 * }
 * ```
 *
 * and set the codec to be : secretValue:
 *
 * ```
 * export const UserLogContext = t.type({
 *  id: dbModelId('user'),
 *  email: secretValue(t.string),
 *  name: secretValue(t.string),
 * });
 *  ```
 *
 * @param underlyingType - The underlying type of secret
 * @returns The secret instance
 */
function secretValue(underlyingType) {
    return new t.Type('SecretValue', (x) => typeof x === 'object' &&
        !!x &&
        x.constructor.name === 'Secret' &&
        !!(0, type_utils_1.decodeCodec)(underlyingType, x.release()), (u, c) => (0, pipeable_1.pipe)(t.object.validate(u, c), (0, Either_1.chain)((n) => underlyingType.validate(n.release(), c))), (a) => a.toString());
}
exports.secretValue = secretValue;
//# sourceMappingURL=secretValue.js.map