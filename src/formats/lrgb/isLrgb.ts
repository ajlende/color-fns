import type { Lrgb } from "./types.js"

/**
 * Check if a color is a valid linear RGB color.
 *
 * @param color Color to check
 *
 * @return True if the color is a valid linear RGB color
 */
export default function isLrgb(color: unknown): color is Lrgb {
	const lrgb = color as Lrgb
	return (
		typeof color === "object" &&
		color !== null &&
		typeof lrgb.r === "number" &&
		typeof lrgb.g === "number" &&
		typeof lrgb.b === "number" &&
		typeof lrgb.a === "number" &&
		Object.keys(color).length === 4
	)
}
