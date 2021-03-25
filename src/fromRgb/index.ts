import { Color, Rgb } from "../types"

/**
 * Convert a color from an Rgb.
 *
 * @param color Input color to convert
 *
 * @return Color in the intermediary format
 */
export default function fromRgb(color: Rgb): Color {
	return [color.r / 255, color.g / 255, color.b / 255, color.a]
}
