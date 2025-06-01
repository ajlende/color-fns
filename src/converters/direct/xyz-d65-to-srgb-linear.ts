import type { XYZ_D65, sRGB_Linear } from "../../_utils.js"

import type { Converter } from "../_utils.js"
import { convert } from "../_utils.js"

/**
 * This matrix was calculated directly from the RGB and white chromaticities
 * when rounded to 8 decimal places, it agrees completely with the official
 * matrix {@link https://github.com/w3c/csswg-drafts/issues/5922}
 */
export const M = [
	[3.2409699419045226, -1.537383177570094, -0.4986107602930034],
	[-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
	[0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
] as const

/**
 * Convert from XYZ D65 to linear sRGB
 *
 * @param input XYZ D65 color
 * @returns Linear sRGB color
 *
 * @category Color Space Conversion
 */
export const xyzD65ToSrgbLinear: Converter<XYZ_D65, sRGB_Linear> = convert(
	(input) => {
		const { x, y, z } = input

		const r = M[0][0] * x + M[0][1] * y + M[0][2] * z
		const g = M[1][0] * x + M[1][1] * y + M[1][2] * z
		const b = M[2][0] * x + M[2][1] * y + M[2][2] * z

		return { r, g, b } as sRGB_Linear
	},
)
