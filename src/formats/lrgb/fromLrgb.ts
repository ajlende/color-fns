import type { Color } from "../../types.js"
import type { Lrgb } from "./types.js"

function srgb(linear: number): number {
	if (linear <= 0.0031308) {
		return linear * 12.92
	}
	return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055
}

/**
 * Convert a color from linear RGB to sRGB.
 *
 * Implements the sRGB transfer function (gamma correction) as defined in
 * IEC 61966-2-1:1999, section 5.2.2.
 *
 * @param color Input color to convert
 *
 * @return Color in sRGB space
 */
export default function fromLrgb(color: Lrgb): Color {
	return [srgb(color.r), srgb(color.g), srgb(color.b), color.a]
}
