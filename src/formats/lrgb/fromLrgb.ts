import type { Color } from "../../types.js"
import type { Lrgb } from "./types.js"

/**
 * Convert a color from a linear RGB.
 *
 * @param color Input color to convert
 *
 * @return Color in the intermediary format
 */
export default function fromLrgb(color: Lrgb): Color {
	return [color.r, color.g, color.b, color.a]
}
