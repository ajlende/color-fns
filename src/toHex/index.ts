import { Hex, Color } from "../types"

/**
 * Convert an RGB object to a CSS hex string.
 *
 * @param color RGB values.
 *
 * @return CSS hex string.
 */
export default function toHex(color: Color): Hex {
	const r = color[0] * 0xff
	const g = color[1] * 0xff
	const b = color[2] * 0xff
	const a = color[3] * 0xff

	if (a !== 0xff) {
		const num = (r << 24) | (g << 16) | (b << 8) | a

		return `#${num.toString(16).padStart(8, "0")}`
	}

	const num = (r << 16) | (g << 8) | b

	return `#${num.toString(16).padStart(6, "0")}`
}
