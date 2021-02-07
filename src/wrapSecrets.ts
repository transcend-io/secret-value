// local
import { apply } from './apply';
import type { StringKeys } from './types';
import { Secretify, Secret } from './Secret';

/**
 * Utility function to wrap values of an object as secrets
 *
 * @param obj - The object to modify
 * @param secretKeys - The keys of the object that should be secrets
 * @returns The object with values wrapped as secrets
 */
export function wrapSecrets<T extends object, TSecretKey extends StringKeys<T>>(
  obj: T,
  secretKeys: TSecretKey[],
): Secretify<T, TSecretKey> {
  return apply(obj, (value, key) =>
    secretKeys.includes(key as TSecretKey) ? new Secret(value) : value,
  ) as Secretify<T, TSecretKey>;
}
