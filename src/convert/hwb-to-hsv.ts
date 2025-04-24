import type { HWB, HSV } from "../_utils.js"

import type { Converter } from "./_utils.js"

/**
 * Convert from HWB to HSV
 *
 * @param input HWB color
 * @returns HSV color
 *
 * @category Color Space Conversion
 */
export const hwbToHsv: Converter<HWB, HSV> = (input) => {
	const { h, w, b } = input

	const w2 = w / 100
	const b2 = b / 100

	const sum = w + b
	if (sum >= 1) {
		const gray = w2 / sum
		return { h, s: 0, v: gray * 100 } as HSV
	}

	const v = 1 - b2
	const s = v === 0 ? 0 : 1 - w2 / v
	return { h, s: s * 100, v: v * 100 } as HSV
}
