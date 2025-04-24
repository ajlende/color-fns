import type { sRGB, sRGB_Linear } from "../_utils.js"

import type { Converter } from "./_utils.js"

function f(val: number) {
	const sign = val < 0 ? -1 : 1
	const abs = val * sign

	if (abs > 0.0031308) {
		return sign * (1.055 * abs ** (1 / 2.4) - 0.055)
	}

	return 12.92 * val
}

/**
 * Convert from linear sRGB to sRGB
 *
 * @param input Linear sRGB color
 * @returns sRGB color
 *
 * @category Color Space Conversion
 */
export const srgbLinearToSrgb: Converter<sRGB_Linear, sRGB> = (input) => {
	return {
		r: f(input.r),
		g: f(input.g),
		b: f(input.b),
	} as sRGB
}
