import { Hsl } from "../types"

/**
 * Test if the given color is a Hsl color.
 *
 * @param color Color to test for being a Hsl color
 *
 * @return True if the color is a Hsl color
 */
export default function isHsl(color: unknown): color is Hsl {
	return (
		typeof color === "object" &&
		color !== null &&
		typeof (color as Hsl).h === "number" &&
		typeof (color as Hsl).s === "number" &&
		typeof (color as Hsl).l === "number" &&
		typeof (color as Hsl).a === "number" &&
		Object.keys(color).length === 4
	)
}
