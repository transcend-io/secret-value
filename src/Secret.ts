// local
import type { Identity, StringKeys } from './types';

const REDACTED = '[redacted]';

/**
 * A secret that must be explicitly released. It is made to be annoying, so that
 * users must really make an effort to release the stored value.
 * The goal is to prevent accidentally logging secret values.
 */
export class Secret<T> {
  /** The secret value */
  private value: T;

  /**
   * Constructor
   *
   * @param value - The secret value
   */
  constructor(value: T) {
    this.value = value;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Ensure secrets are not coerced to their secret values.
   * 
   * toJSON is called in cases like JSON.stringify(obj)
   *
   * @returns a redacted message
   */
  public toJSON(): string {
    return REDACTED;
  }

  /**
   * Ensure secrets are not coerced to their secret values.
   *
   * @returns a redacted message
   */
  public valueOf(): string {
    return REDACTED;
  }

  /**
   * Ensure secrets are not coerced to their secret values.
   * 
   * This is the method used by `console.log` on objects
   *
   * @returns a redacted message
   */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    return REDACTED;
  }

  /**
   * Ensure secrets are not coerced to their secret values.
   *
   * @returns a redacted message
   */
  public toLocaleString(): string {
    return REDACTED;
  }

  /**
   * Ensure secrets are not coerced to their secret values.
   *
   * @returns a redacted message
   */
  public toString(): string {
    return REDACTED;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Releases the secret for usage
   *
   * @returns the secret value
   */
  public release(): T {
    return this.value;
  }

  /**
   * Apply a function to the secret value, and returns a new Secret with that value.
   *
   * @param transformFunc - Function to apply to the current value
   * @returns the new secret for chaining other commands
   */
  public map<R>(transformFunc: (value: T) => R): Secret<R> {
    return new Secret(transformFunc(this.value));
  }
}

/**
 * Set the type of values in an object to be Secret<value> by name of object key
 */
export type Secretify<
  T extends object,
  TSecretKey extends StringKeys<T>
> = Identity<
  {
    [k in keyof T]: k extends TSecretKey ? Secret<T[k]> : T[k];
  }
>;
