/**
 * Object representation of linear RGB color. Red, green, and blue values in the range
 * [0,1] and alpha values in the range [0,1]. This is the linear (gamma=1) version of sRGB.
 *
 * @example
 * ```
 * const lrgb: Lrgb = {
 *   r: 0.2,
 *   g: 0.4,
 *   b: 0.6,
 *   a: 0.8,
 * }
 * ```
 */
export interface Lrgb {
	r: number
	g: number
	b: number
	a: number
}
