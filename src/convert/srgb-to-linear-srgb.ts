import type { Converter, sRGB, sRGB_Linear } from "../_types.js"

function f(val: number) {
	const sign = val < 0 ? -1 : 1
	const abs = val * sign

	if (abs <= 0.04045) {
		return val / 12.92
	}

	return sign * ((abs + 0.055) / 1.055) ** 2.4
}

/**
 * Convert from sRGB to linear sRGB
 *
 * @param input sRGB color
 * @returns Linear sRGB color
 *
 * @category Color Space Conversion
 */
export const srgbToLinear: Converter<sRGB, sRGB_Linear> = (input) => {
	return {
		r: f(input.r),
		g: f(input.g),
		b: f(input.b),
	} as sRGB_Linear
}
