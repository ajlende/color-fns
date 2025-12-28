/**
 * Color Space
 *
 * @typeParam K - The color space identifier
 * @typeParam T - The color space coordinate structure
 *
 * @remarks
 * A color space is a set of colors that are defined by a specific range of values.
 *
 * @example
 * ```ts
 * type RGB = Color<"sRGB", { r: number; g: number; b: number }>
 * ```
 *
 * @category Color Space Utilities
 */
export type Color<K extends string, T> = T & {
	/**
	 * Transparency
	 *
	 * @defaultValue `1` (fully opaque)
	 */
	alpha?: RefRange<0, 1>
} & {
	/**
	 * Color space key
	 */
	readonly __space: K
}

/**
 * An unknown color space.
 *
 * @category Color Space Utilities
 */
export type UnknownColor = Color<string, unknown>

/**
 * Color Space Key
 *
 * Extract the key of a color space.
 *
 * @typeParam S - The color space
 *
 * @example
 * ```ts
 * type sRGBKey = ColorSpaceKey<sRGB> // "sRGB"
 * ```
 *
 * @category Color Space Utilities
 */
export type ColorSpace<S extends UnknownColor> = S["__space"]

/**
 * Color Space Data
 *
 * Extract the data of a color space.
 *
 * @typeParam S - The color space
 *
 * @example
 * ```ts
 * type sRGBData = ColorSpaceData<sRGB> // { r: number; g: number; b: number }
 * ```
 *
 * @category Color Space Utilities
 */
export type ColorData<S extends UnknownColor> = Omit<S, "__space">

/**
 * Extract the data of a color space.
 *
 * @typeParam S - The color space
 * @typeParam K - The color space key
 *
 * @category Color Space Utilities
 */
// prettier-ignore
export type ColorOf<
	C extends UnknownColor,
	S extends ColorSpace<C>,
> = Extract<C, Color<S, unknown>>

/**
 * A number with an associated reference range.
 *
 * @typeParam U - The minimum value of the range
 * @typeParam V - The maximum value of the range
 *
 * @example
 * ```ts
 * type Normalized = RefRange<0, 1>
 * type Percentage = RefRange<0, 100>
 * ```
 *
 * @category Color Space Utilities
 */
export type RefRange<U extends number, V extends number> = number & {
	readonly __range?: [min: U, max: V]
}

/**
 * A number with an associated reference angle.
 *
 * @typeParam U - The minimum value of the angle
 * @typeParam V - The maximum value of the angle
 *
 * @example
 * ```ts
 * type Degrees = RefAngle<0, 360>
 * type Radians = RefAngle<0, 2 * Math.PI>
 * ```
 *
 * @category Color Space Utilities
 */
export type RefAngle<U extends number, V extends number> = RefRange<U, V> & {
	readonly __angle?: true
}
