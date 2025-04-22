import type { Converter, HSV, HWB } from "../_types.js"

/**
 * Convert from HSV to HWB
 *
 * @param input HSV color
 * @returns HWB color
 *
 * @category Color Space Conversion
 */
export const hsvToHwb: Converter<HSV, HWB> = (input) => {
	const { h, s, v } = input
	return { h, w: (v * (100 - s)) / 100, b: 100 - v } as HWB
}
