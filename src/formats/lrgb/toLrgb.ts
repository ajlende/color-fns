import type { Color } from "../../types.js"
import type { Lrgb } from "./types.js"

function linear(srgb: number): number {
	if (srgb <= 0.04045) {
		return srgb / 12.92
	}
	return Math.pow((srgb + 0.055) / 1.055, 2.4)
}
/**
 * Convert a color from sRGB to linear RGB.
 *
 * Implements the inverse sRGB transfer function (gamma expansion) as defined in
 * IEC 61966-2-1:1999, section 5.2.2.
 *
 * @param color Input color to convert
 *
 * @return Color in linear RGB space
 */
export default function toLrgb(color: Color): Lrgb {
	return {
		r: linear(color[0]),
		g: linear(color[1]),
		b: linear(color[2]),
		a: color[3],
	}
}
