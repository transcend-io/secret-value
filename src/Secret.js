"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = void 0;
const REDACTED = '[redacted]';
/**
 * A secret that must be explicitly released. It is made to be annoying, so that
 * users must really make an effort to release the stored value.
 * The goal is to prevent accidentally logging secret values.
 */
class Secret {
    /**
     * Constructor
     *
     * @param value - The secret value
     */
    constructor(value) {
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
    toJSON() {
        return REDACTED;
    }
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * @returns a redacted message
     */
    valueOf() {
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
    toLocaleString() {
        return REDACTED;
    }
    /**
     * Ensure secrets are not coerced to their secret values.
     *
     * @returns a redacted message
     */
    toString() {
        return REDACTED;
    }
    /* eslint-enable class-methods-use-this */
    /**
     * Releases the secret for usage
     *
     * @returns the secret value
     */
    release() {
        return this.value;
    }
    /**
     * Apply a function to the secret value, and returns a new Secret with that value.
     *
     * @param transformFunc - Function to apply to the current value
     * @returns the new secret for chaining other commands
     */
    map(transformFunc) {
        return new Secret(transformFunc(this.value));
    }
}
exports.Secret = Secret;
//# sourceMappingURL=Secret.js.map