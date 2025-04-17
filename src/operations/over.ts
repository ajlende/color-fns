import type { Color } from "../types.js"

/**
 * Porter Duff over operation.
 *
 * @param source Source color
 * @param dest Destination color
 * @returns Source color over destination color.
 */
export default function over(source: Color, dest: Color): Color {
	return [
		source[0] * source[3] + dest[0] * dest[3] * (1 - source[3]),
		source[1] * source[3] + dest[1] * dest[3] * (1 - source[3]),
		source[2] * source[3] + dest[2] * dest[3] * (1 - source[3]),
		source[3] + dest[3] * (1 - source[3]),
	]
}
