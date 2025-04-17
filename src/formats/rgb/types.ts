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
	r: number
	g: number
	b: number
	a: number
}
