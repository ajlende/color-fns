import type { Color } from "../types.js"

/**
 * This contains a function to test if a value is of a given type and then
 * convert that type to the intermediate format.
 */
// TODO: Think of a better name.
export interface ColorType<T> {
	/**
	 * Check to see if the type of the input is T so it can be converted later.
	 */
	isType: (color: unknown) => color is T
	/**
	 * Convert from the type T to the intermediate format.
	 */
	fromType: (color: T) => Color
}

/**
 * Readonly array with at least one element.
 */
export type NonemptyReadonlyArray<T> = ReadonlyArray<T> & {
	readonly 0: T
}

/**
 * Utility type to help with type checking the {@link fromAny} and related
 * functions for converting from multiple types.
 */
export type ExtractColorTypes<T> = {
	[K in keyof T]: T[K] extends ColorType<infer R> ? R : unknown
}
