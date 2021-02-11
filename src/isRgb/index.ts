import { Rgb } from "../types"

/**
 * Test if the given color is a Rgb color.
 *
 * @param color Color to test for being an Rgb color
 *
 * @return True if the color is an Rgb color
 */
export default function isRgb(color: unknown): color is Rgb {
	return (
		typeof color === "object" &&
		color !== null &&
		typeof (color as Rgb).r === "number" &&
		typeof (color as Rgb).g === "number" &&
		typeof (color as Rgb).b === "number" &&
		typeof (color as Rgb).a === "number" &&
		Object.keys(color).length === 4
	)
}
