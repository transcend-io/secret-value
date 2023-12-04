import { chain } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';

import { Secret } from './Secret';
import { decodeCodec } from '@transcend-io/type-utils';

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
export function secretValue<T extends t.Any>(
  underlyingType: T,
): t.Type<Secret<t.TypeOf<T>>, t.TypeOf<T>, unknown> {
  return new t.Type<Secret<t.TypeOf<T>>, t.TypeOf<T>, unknown>(
    'SecretValue',
    (x): x is Secret<t.TypeOf<T>> =>
      typeof x === 'object' &&
      !!x &&
      x.constructor.name === 'Secret' &&
      !!decodeCodec(underlyingType as any, (x as Secret<t.TypeOf<T>>).release()),
    (u, c) =>
      pipe(
        t.object.validate(u, c),
        chain((n) =>
          underlyingType.validate((n as Secret<t.TypeOf<T>>).release(), c),
        ),
      ),
    (a) => a.toString(),
  );
}
