import type { HSL } from "../../../core/spaces.js"
import type { HslString } from "./_utils.js"

/**
 * Convert a color to a CSS RGB string.
 *
 * @param color Input color to convert
 *
 * @return Color converted to HslString
 */
export function toHslString(color: HSL): HslString {
	const { h, s, l, alpha } = color
	if (alpha === 1) {
		return `hsl(${h}, ${s * 100}%, ${l * 100}%)`
	} else {
		return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${alpha})`
	}
}
