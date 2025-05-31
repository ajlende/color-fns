import type { sRGB } from "../../../_utils.js"
import type { Hex } from "./_utils.js"

/**
 * Convert a hex string to an sRGB color
 *
 * @see https://www.w3.org/TR/css-color-4/#hex-notation
 *
 * @param color Hex string
 *
 * @return sRGB color
 *
 * @throws {TypeError}
 * Thrown if the input string is not a valid hex format
 */
export function hexToSrgb(color: Hex): sRGB {
	const c = color.trim()

	let r = 0x00
	let g = 0x00
	let b = 0x00
	// let a = 0xff

	switch (c.length) {
		// Parse #RRGGBBAA and #RRGGBB strings.
		case 9:
		// a = Number(`0x${c[7]}${c[8]}`)
		case 7:
			r = Number(`0x${c[1]}${c[2]}`)
			g = Number(`0x${c[3]}${c[4]}`)
			b = Number(`0x${c[5]}${c[6]}`)
			break
		// Parse #RGBA and #RGB strings.
		case 5:
		// a = Number(`0x${c[4]}${c[4]}`)
		case 4:
			r = Number(`0x${c[1]}${c[1]}`)
			g = Number(`0x${c[2]}${c[2]}`)
			b = Number(`0x${c[3]}${c[3]}`)
			break
		default:
			throw new RangeError("Color is not a valid hex format.")
	}

	return { r: r / 0xff, g: g / 0xff, b: b / 0xff } as sRGB
}
