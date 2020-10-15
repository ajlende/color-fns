import { Hex } from "../types"

/**
 * Test if the given color is a Hex color.
 *
 * @param color Color to test for being a Hex color
 *
 * @return True if the color is a Hex color
 */
export default function isHex(color: unknown): color is Hex {
	// TODO: Test regex performance
	return (
		typeof color === "string" &&
		[4, 5, 7, 9].includes(color.length) &&
		/^#[0-9a-fA-F]+$/.test(color)
	)
}
