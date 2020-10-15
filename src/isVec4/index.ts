import { Vec4 } from "../types"

/**
 * Test if the given color is a Vec4 color.
 *
 * @param color Color to test for being a Vec4 color
 *
 * @return True if the color is a Vec4 color
 */
export default function isVec4(color: unknown): color is Vec4 {
	return (
		Array.isArray(color) &&
		color.length === 4 &&
		color.every((c) => typeof c === "number")
	)
}
