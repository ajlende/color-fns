import { Color, RgbString } from "../types"

/**
 * Convert a color to a CSS RGB string.
 *
 * @param color Input color to convert
 *
 * @return Color converted to RgbString
 */
export default function toRgbString(color: Color): RgbString {
	const v = color.filter((x, i) => i < 3).map((x) => `${x * 255}`)
	if (color[3] === 1) {
		return `rgb(${v.join(", ")})`
	} else {
		v.push(`${color[3]}`)
		return `rgba(${v.join(", ")})`
	}
}
