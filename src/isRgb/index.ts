import { Rgb } from "../types"

/**
 * Test if the given color is a Rgb color.
 *
 * @param color Color to test for being an Rgb color
 *
 * @return True if the color is an Rgb color
 */
export default function isRgb(color: unknown): color is Rgb {
	if (typeof color !== "object" || color == null) return false
	const values = Object.values(color)
	return (
		values.length === 4 &&
		Object.prototype.hasOwnProperty.call(color, "r") &&
		Object.prototype.hasOwnProperty.call(color, "g") &&
		Object.prototype.hasOwnProperty.call(color, "b") &&
		Object.prototype.hasOwnProperty.call(color, "a") &&
		values.every((v) => typeof v === "number")
	)
}
