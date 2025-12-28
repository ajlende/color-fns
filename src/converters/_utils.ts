import { ColorData, UnknownColor } from "../core/_utils.js"

/**
 * A function that converts a color space to another color space.
 *
 * @template F - The source color space.
 * @template T - The target color space.
 *
 * @example
 * ```ts
 * export const srgbToHsl: Converter<sRGB, HSL> = (input) => {
 * 	// ...
 * 	return { h, s, l } as HSL
 * }
 * ```
 *
 * @category Color Space Conversion
 */
export interface Converter<F extends UnknownColor, T extends UnknownColor> {
	(input: F): T
	(input: ColorData<F>): T
}

/**
 * An unknown converter.
 *
 * @category Color Space Conversion
 */
export type UnknownConverter = Converter<UnknownColor, UnknownColor>
