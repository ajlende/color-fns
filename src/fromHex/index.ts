import { Hex, Color } from "../types"

/**
 * Convert a hex string to an RGB object, discarding any alpha component.
 *
 * @param color Hex string
 *
 * @return Color in the intermediary format or null if the color could not be parsed
 *
 * @throws {TypeError}
 * Thrown if the input string is not a valid hex format.
 */
export default function fromHex(color: Hex): Color {
	let r = 0x00
	let g = 0x00
	let b = 0x00
	let a = 0xff

	/* eslint-disable no-fallthrough */
	switch (color.length) {
		// Parse #RRGGBBAA and #RRGGBB strings.
		case 9:
			a = Number(`0x${color[7]}${color[8]}`)
		case 7:
			r = Number(`0x${color[1]}${color[2]}`)
			g = Number(`0x${color[3]}${color[4]}`)
			b = Number(`0x${color[5]}${color[6]}`)
			break
		// Parse #RGBA and #RGB strings.
		case 5:
			a = Number(`0x${color[4]}${color[4]}`)
		case 4:
			r = Number(`0x${color[1]}${color[1]}`)
			g = Number(`0x${color[2]}${color[2]}`)
			b = Number(`0x${color[3]}${color[3]}`)
			break
		default:
			throw new RangeError("Color is not a valid hex format.")
	}
	/* eslint-enable no-fallthrough */

	return [r / 0xff, g / 0xff, b / 0xff, a / 0xff]
}
