import { RgbString, Color } from "../types"

const RGBA_REGEX = /rgba?\(\s*([\d.]+%?)[\s,]+([\d.]+%?)[\s,]+([\d.]+%?)(?:[\s,/]+([\d.]+%?))?\s*\)/i

/**
 * Convert `rgb()` or `rgba()` to the intermediary Color format
 *
 * @see https://www.w3.org/TR/css-color-4/#rgb-functions
 *
 * @param color `rgb()` or `rgba()` string
 *
 * @return Color in the intermediary format or null if the color could not be parsed
 *
 * @throws {RangeError}
 * Thrown if the input string is not a valid `rgb()` format.
 */
export default function fromRgbString(color: RgbString): Color {
	const s = RGBA_REGEX.exec(color)

	if (!s) {
		throw new RangeError("Color is not a valid rgb format. Regex failed.")
	}

	const r = s[1]
	const g = s[2]
	const b = s[3]
	const a = s[4]

	const v = [r, g, b].map((x) => {
		const y = parseFloat(x)
		if (isNaN(y)) {
			throw new RangeError(
				"Color is not a valid rgb format. Color parse failed.",
			)
		}
		if (x[x.length - 1] === "%") {
			return Math.min(Math.max(0, y), 100) / 100
		} else {
			return Math.min(Math.max(0, y), 255) / 255
		}
	})

	if (a) {
		const b = parseFloat(a)
		if (isNaN(b)) {
			throw new RangeError(
				"Color is not a valid rgb format. Alpha parse failed.",
			)
		}
		if (a[a.length - 1] === "%") {
			v.push(Math.min(Math.max(0, b), 100) / 100)
		} else {
			v.push(Math.min(Math.max(0, b), 1))
		}
	} else {
		v.push(1)
	}

	return v as Color
}
