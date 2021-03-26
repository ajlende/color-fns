// -------------------------------------
// Color representations
// -------------------------------------

/**
 * Internal color representation. Stored as a {@link Vec4}.
 */
export type Color = Vec4

/**
 * Array of sRGB [red, green, blue, alpha] values in the range [0,1].
 *
 * @example
 * ```
 * const color: Vec4 = [0.2, 0.4, 0.6, 0.8]
 * ```
 */
export type Vec4 = [number, number, number, number]

/**
 * Hexadecimal string preceded by a '#' as used in CSS.
 *
 * @example
 * ```
 * const hex3: Hex = "#369"      // 3-digit
 * const hex6: Hex = "#336699"   // 6-digit
 * const hex4: Hex = "#369c"     // 4-digit (with alpha)
 * const hex8: Hex = "#336699cc" // 8-digit (with alpha)
 * ```
 */
export type Hex = string

/**
 * Object representation of hue, saturation, lightness, and alpha.
 *
 * @example
 * ```
 * const hsl: Hsl = {
 *   h: 210,
 *   s: 0.5,
 *   l: 0.4,
 *   a: 0.8,
 * }
 * ```
 */
export interface Hsl {
	/**
	 * Hue in degrees.
	 */
	h: number
	/**
	 * Saturation in the range [0,1].
	 */
	s: number
	/**
	 * Lightness in the range [0,1].
	 */
	l: number
	/**
	 * Alpha in the range [0,1].
	 */
	a: number
}

/**
 * HSL string as used in CSS.
 *
 * @example
 * ```
 * const hsl: HslString = "hsl(210, 50%, 40%)"
 * const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
 * ```
 */
export type HslString = string

/**
 * Object representation of hue, saturation, value, and alpha.
 *
 * @example
 * ```
 * const hsv: Hsv = {
 *   h: 210,
 *   s: 0.5,
 *   v: 0.6,
 *   a: 0.8,
 * }
 * ```
 */
export interface Hsv {
	/**
	 * Hue in degrees.
	 */
	h: number
	/**
	 * Saturation in the range [0,1].
	 */
	s: number
	/**
	 * Value in the range [0,1].
	 */
	v: number
	/**
	 * Alpha in the range [0,1].
	 */
	a: number
}

/**
 * RGB string as used in CSS.
 *
 * @example
 * ```
 * const hsl: HslString = "hsl(210, 50%, 40%)"
 * const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
 * ```
 */
export type RgbString = string

/**
 * Object representation of sRGB color. Red, green, and blue values in the range
 * [0,255] and alpha values in the range [0,1].
 *
 * @example
 * ```
 * const rgb: Rgb = {
 *   r: 51,
 *   g: 102,
 *   b: 153,
 *   a: 0.8,
 * }
 * ```
 */
export interface Rgb {
	/**
	 * Red value in the range [0,255].
	 */
	r: number
	/**
	 * Green value in the range [0,255].
	 */
	g: number
	/**
	 * Blue value in the range [0,255].
	 */
	b: number
	/**
	 * Alpha value in the range [0,1].
	 */
	a: number
}

// -------------------------------------
// Function-related types
// -------------------------------------

/**
 * TODO: Think of a better name. This contains a function to test if a value is
 * of a given type and then convert that type to the intermediate format.
 */
export interface Parser<T> {
	/**
	 * Check to see if the type of the input is T so it can be converted later.
	 */
	test: (color: unknown) => color is T
	/**
	 * Convert from the type T to the intermediate format.
	 */
	convert: (color: T) => Color
}

// -------------------------------------
// Utility types
// -------------------------------------

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
export type ExtractParserTypes<T> = {
	[K in keyof T]: T[K] extends Parser<infer R> ? R : unknown
}
