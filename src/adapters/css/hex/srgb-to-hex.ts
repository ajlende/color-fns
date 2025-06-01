import type { sRGB } from "../../../_utils.js"
import type { Hex } from "./_utils.js"

/**
 * Convert an sRGB object to a CSS hex string.
 *
 * @param color sRGB values.
 *
 * @return CSS hex string.
 */
export function srgbToHex(color: sRGB): Hex {
	const r = color.r * 0xff
	const g = color.g * 0xff
	const b = color.b * 0xff
	// const a = color.a * 0xff

	// if (a !== 0xff) {
	// 	const num = (r << 24) | (g << 16) | (b << 8) | a

	// 	return `#${num.toString(16).padStart(8, "0")}`
	// }

	const num = (r << 16) | (g << 8) | b

	return `#${num.toString(16).padStart(6, "0")}`
}
