import type { sRGB_Linear, XYZ_D65 } from "../_utils.js"

import type { Converter } from "./_utils.js"

/**
 * This matrix was calculated directly from the RGB and white chromaticities
 * when rounded to 8 decimal places, it agrees completely with the official
 * matrix {@link https://github.com/w3c/csswg-drafts/issues/5922}
 */
const M = [
	[0.41239079926595934, 0.357584339383878, 0.1804807884018343],
	[0.21263900587151027, 0.715168678767756, 0.07219231536073371],
	[0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
] as const

/**
 * Convert from linear sRGB to XYZ D65
 *
 * @param input Linear sRGB color
 * @returns XYZ D65 color
 *
 * @category Color Space Conversion
 */
export const srgbLinearToXyzD65: Converter<sRGB_Linear, XYZ_D65> = (input) => {
	const { r, g, b } = input

	const x = M[0][0] * r + M[0][1] * g + M[0][2] * b
	const y = M[1][0] * r + M[1][1] * g + M[1][2] * b
	const z = M[2][0] * r + M[2][1] * g + M[2][2] * b

	return { x, y, z } as XYZ_D65
}
