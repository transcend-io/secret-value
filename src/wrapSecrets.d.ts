import { StringKeys } from '@transcend-io/type-utils';
import { Secretify } from './Secret';
/**
 * Utility function to wrap values of an object as secrets
 *
 * @param obj - The object to modify
 * @param secretKeys - The keys of the object that should be secrets
 * @returns The object with values wrapped as secrets
 */
export declare function wrapSecrets<T extends object, TSecretKey extends StringKeys<T>>(obj: T, secretKeys: TSecretKey[]): Secretify<T, TSecretKey>;
//# sourceMappingURL=wrapSecrets.d.ts.map