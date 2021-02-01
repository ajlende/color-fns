import { Color, RgbString } from "../types"

/**
 * Convert a color to a CSS RGB string.
 *
 * @param color Input color to convert
 *
 * @return Color converted to RgbString
 */
export default function toRgbString(color: Color): RgbString {
	if (color[3] === 1) {
		const v = color.filter((x, i) => i < 3).map((x) => `${x * 100}%`)
		return `rgb(${v.join(",")})`
	} else {
		const v = color.map((x) => `${x * 100}%`)
		return `rgba(${v.join(",")})`
	}
}
