import type { Color } from "../../types.js"
import type { Lrgb } from "./types.js"

/**
 * Convert a color to a linear RGB.
 *
 * @param color Input color to convert
 *
 * @return Color converted to linear RGB
 */
export default function toLrgb(color: Color): Lrgb {
	return {
		r: color[0],
		g: color[1],
		b: color[2],
		a: color[3],
	}
}
