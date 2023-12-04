import * as t from 'io-ts';
import { Secret } from './Secret';
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
export declare function secretValue<T extends t.Any>(underlyingType: T): t.Type<Secret<t.TypeOf<T>>, t.TypeOf<T>, unknown>;
//# sourceMappingURL=secretValue.d.ts.map