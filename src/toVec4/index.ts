import { Color, Vec4 } from "../types"

/**
 * Convert a color to a Vec4.
 *
 * @param color Input color to convert
 *
 * @return Color converted to Vec4
 */
export default function toVec4(color: Color): Vec4 {
	// Vec4 is used as the intermediary, so this is a no-op
	return color
}
