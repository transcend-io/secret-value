/**
 * An arbitrary object keyed by strings for naming consistency
 */
export type ObjByString = { [key in string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * To make the inspected type more tractable than a bunch of intersections
 */
export type Identity<T> = {
  [K in keyof T]: T[K];
};

/**
 * Extract string keys from an object
 */
export type StringKeys<TObj extends ObjByString> = Extract<keyof TObj, string>;
