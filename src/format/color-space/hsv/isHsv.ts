import type { Hsv } from "../../../types.js"

/**
 * Test if the given color is a Hsv color.
 *
 * @param color Color to test for being a Hsv color
 *
 * @return True if the color is a Hsv color
 */
export default function isHsv(color: unknown): color is Hsv {
	return (
		typeof color === "object" &&
		color !== null &&
		typeof (color as Hsv).h === "number" &&
		typeof (color as Hsv).s === "number" &&
		typeof (color as Hsv).v === "number" &&
		typeof (color as Hsv).a === "number" &&
		Object.keys(color).length === 4
	)
}
