import type { Converter, sRGB, HSV } from "../_types.js"

/**
 * Convert from sRGB to HSV
 *
 * @param input sRGB color
 * @returns HSV color
 *
 * @category Color Space Conversion
 */
export const srgbToHsv: Converter<sRGB, HSV> = (input) => {
	const { r, g, b } = input

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)

	let h = 0
	let s = 0
	const v = max

	const d = max - min

	if (d !== 0) {
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

	if (v) {
		s = d / v
	}

	if (h >= 360) {
		h -= 360
	}

	return { h, s: s * 100, v: v * 100 } as HSV
}
