import { Color, HslString } from "../types"
import toHsl from "../toHsl"

/**
 * Convert a color to a CSS RGB string.
 *
 * @param color Input color to convert
 *
 * @return Color converted to HslString
 */
export default function toHslString(color: Color): HslString {
	const { h, s, l, a } = toHsl(color)
	if (a === 1) {
		return `hsl(${h}, ${s * 100}%, ${l * 100}%)`
	} else {
		return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`
	}
}
