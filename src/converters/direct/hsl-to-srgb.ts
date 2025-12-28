import type { HSL, sRGB } from "../../core/_utils.js"
import { color } from "../../core/_utils.js"

import type { Converter } from "../_utils.js"
import { convert } from "./_utils.js"

function f(n: number, h: number, s: number, l: number) {
	const k = (n + h / 30) % 12
	const a = s * Math.min(l, 1 - l)
	return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
}

/**
 * Convert from HSL to sRGB
 *
 * @param input HSL color
 * @returns sRGB color
 *
 * @category Color Space Conversion
 */
export const hslToSrgb: Converter<HSL, sRGB> = convert((input) => {
	let { h, s, l } = input

	h = h % 360

	if (h < 0) {
		h += 360
	}

	s /= 100
	l /= 100

	return color("sRGB", {
		r: f(0, h, s, l),
		g: f(8, h, s, l),
		b: f(4, h, s, l),
	})
})
