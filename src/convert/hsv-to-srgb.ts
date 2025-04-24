import type { Converter, HSV, sRGB } from "../_utils.js"

/**
 * Convert from HSV to sRGB
 *
 * @param input HSV color
 * @returns sRGB color
 *
 * @category Color Space Conversion
 */
export const hsvToSrgb: Converter<HSV, sRGB> = (input) => {
	let { h, s, v } = input
	h = h % 360

	if (h < 0) {
		h += 360
	}

	s /= 100
	v /= 100

	function f(n: number) {
		const k = (n + h / 60) % 6
		return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
	}

	return {
		r: f(5),
		g: f(3),
		b: f(1),
	} as sRGB
}
