import type { Identity, StringKeys } from '@transcend-io/type-utils';
/**
 * A secret that must be explicitly released. It is made to be annoying, so that
 * users must really make an effort to release the stored value.
 * The goal is to prevent accidentally logging secret values.
 */
export declare class Secret<T> {
    /** The secret value */
    private value;
    /**
     * Constructor
     *
     * @param value - The secret value
     */
    constructor(value: T);
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * toJSON is called in cases like JSON.stringify(obj)
     *
     * @returns a redacted message
     */
    toJSON(): string;
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * @returns a redacted message
     */
    valueOf(): string;
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * @returns a redacted message
     */
    toLocaleString(): string;
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * @returns a redacted message
     */
    toString(): string;
    /**
     * Releases the secret for usage
     *
     * @returns the secret value
     */
    release(): T;
    /**
     * Apply a function to the secret value, and returns a new Secret with that value.
     *
     * @param transformFunc - Function to apply to the current value
     * @returns the new secret for chaining other commands
     */
    map<R>(transformFunc: (value: T) => R): Secret<R>;
}
/**
 * Set the type of values in an object to be Secret<value> by name of object key
 */
export type Secretify<T extends object, TSecretKey extends StringKeys<T>> = Identity<{
    [k in keyof T]: k extends TSecretKey ? Secret<T[k]> : T[k];
}>;
//# sourceMappingURL=Secret.d.ts.map