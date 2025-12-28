import type { sRGB } from "../../../core/spaces.js"
import type { RgbString } from "./_utils.js"

/**
 * Convert a color to a CSS RGB string.
 *
 * @param color Input color to convert
 *
 * @return Color converted to RgbString
 */
export function toRgbString(color: sRGB): RgbString {
	const v = [color.r, color.g, color.b].map((x) => `${x * 255}`)

	if (color.alpha === 1) {
		return `rgb(${v.join(", ")})`
	}

	v.push(`${color.alpha}`)
	return `rgba(${v.join(", ")})`
}
