import type { sRGB } from "../../../core/spaces.js"
import type { GlVec4 } from "./_utils.js"

/**
 * Convert a color to a Vec4.
 *
 * @param color Input color to convert
 *
 * @return Color converted to Vec4
 */
export function toVec4(color: sRGB): GlVec4 {
	return [color.r, color.g, color.b, color.alpha ?? 1] as GlVec4
}
