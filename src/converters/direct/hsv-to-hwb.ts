import type { HSV, HWB } from "../../_utils.js"

import type { Converter } from "../_utils.js"
import { convert } from "../_utils.js"

/**
 * Convert from HSV to HWB
 *
 * @param input HSV color
 * @returns HWB color
 *
 * @category Color Space Conversion
 */
export const hsvToHwb: Converter<HSV, HWB> = convert((input) => {
	const { h, s, v } = input
	return { h, w: (v * (100 - s)) / 100, b: 100 - v } as HWB
})
