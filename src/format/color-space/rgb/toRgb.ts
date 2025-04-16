import type { Color, Rgb } from "../../../types.js"

/**
 * Convert a color to an Rgb.
 *
 * @param color Input color to convert
 *
 * @return Color converted to Rgb
 */
export default function toRgb(color: Color): Rgb {
	return {
		r: color[0] * 255,
		g: color[1] * 255,
		b: color[2] * 255,
		a: color[3],
	}
}
