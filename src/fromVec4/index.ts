import { Color, Vec4 } from "../types"

/**
 * Convert a color from a Vec4.
 *
 * @param color Input color to convert
 *
 * @return Color in the intermediary format
 */
export default function fromVec4(color: Vec4): Color {
	// Vec4 is used as the intermediary, so this is a no-op
	return color
}
