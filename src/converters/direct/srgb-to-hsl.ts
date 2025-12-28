import type { sRGB, HSL } from "../../core/_utils.js"

import type { Converter } from "../_utils.js"
import { convert } from "./_utils.js"

/**
 * Convert from sRGB to HSL
 *
 * @param input sRGB color
 * @returns HSL color
 *
 * @category Color Space Conversion
 */
export const srgbToHsl: Converter<sRGB, HSL> = convert((input) => {
	const { r, g, b } = input

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)

	let h = 0
	let s = 0
	const l = (min + max) / 2

	const d = max - min

	if (d !== 0) {
		s = l === 0 || l === 1 ? 0 : (max - l) / Math.min(l, 1 - l)

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
		}

		h = h * 60
	}

	// Very out of gamut colors can produce negative saturation
	// If so, just rotate the hue by 180 and use a positive saturation
	// see https://github.com/w3c/csswg-drafts/issues/9222
	if (s < 0) {
		h += 180
		s = Math.abs(s)
	}

	if (h >= 360) {
		h -= 360
	}

	return { h, s: s * 100, l: l * 100 } as HSL
})
