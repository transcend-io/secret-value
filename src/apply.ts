// local
import type { ObjByString, StringKeys } from './types';

/**
 * Apply a function to each value of an object. Similar to lodash.mapValues but should preserve the typing of the keys.
 *
 * This allows one to define an object keys in an enum and then the resulting map should keep the same typing
 *
 * @param obj - The object to apply the function to
 * @param applyFunc - The function to apply
 * @returns The updated object
 */
export function apply<TInput extends ObjByString, TOutput>(
  obj: TInput,
  applyFunc: (
    value: TInput[keyof TInput],
    key: StringKeys<TInput>,
    fullObj: typeof obj,
    index: number,
  ) => TOutput,
): { [key in keyof TInput]: TOutput } {
  const result = Object.keys(obj).reduce(
    (acc, key, ind) =>
      Object.assign(acc, {
        [key]: applyFunc(obj[key], key as StringKeys<TInput>, obj, ind),
      }),
    {},
  );
  return result as { [key in keyof TInput]: TOutput };
}
