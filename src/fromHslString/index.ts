import { Color, HslString } from "../types"
import fromHsl from "../fromHsl"

const HSLA_REGEX =
	/hsla?\(\s*([\d.e+-]+)[\s,]+([\d.e+-]+)%[\s,]+([\d.e+-]+)%(?:[\s,]+([\d.e+-]+))?\s*\)/i

/**
 * Convert `hsl()` or `hsla()` to the intermediary Color format
 *
 * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
 *
 * @param color `hsl()` or `hsla()` string
 *
 * @return Color in the intermediary format
 *
 * @throws {RangeError}
 * Thrown if the input string is not a valid `hsl()` format.
 */
export default function fromHslString(color: HslString): Color {
	const r = HSLA_REGEX.exec(color)
	if (!r) {
		throw new RangeError(
			`Color is not a valid hsl format. Regex failed: ${color}.`,
		)
	}

	const v = { h: 0, s: 0, l: 0, a: 1 }

	v.h = parseFloat(r[1])
	if (isNaN(v.h)) {
		throw new RangeError(
			`Color is not a valid hsl format. Hue parse failed: ${r[1]}.`,
		)
	}

	v.s = parseFloat(r[2])
	if (isNaN(v.s)) {
		throw new RangeError(
			`Color is not a valid hsl format. Saturation parse failed: ${r[2]}.`,
		)
	}
	v.s /= 100

	v.l = parseFloat(r[3])
	if (isNaN(v.l)) {
		throw new RangeError(
			`Color is not a valid hsl format. Lightness parse failed: ${r[3]}.`,
		)
	}
	v.l /= 100

	if (r[4]) {
		v.a = parseFloat(r[4])
		if (isNaN(v.a)) {
			throw new RangeError(
				`Color is not a valid hsl format. Alpha parse failed: ${r[4]}.`,
			)
		}
	}

	return fromHsl(v)
}
