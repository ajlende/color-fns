import { RgbString, Color } from "../types"

const RGBA_REGEX = /rgba?\(\s*([\d.e+-]+)[\s,]+([\d.e+-]+)[\s,]+([\d.e+-]+)(?:[\s,]+([\d.e+-]+))?\s*\)/i

/**
 * Convert simple RGB strings to the intermediary Color format
 *
 * @param color Simple RGB string
 *
 * @return Color in the intermediary format
 *
 * @throws {RangeError}
 * Thrown if the input string is not a valid simple RGB format
 */
export default function fromRgbString(color: RgbString): Color {
	const s = RGBA_REGEX.exec(color)

	if (!s) {
		throw new RangeError(
			`Color is not a valid simple RGB format. Regex failed: \`${color}\`.`,
		)
	}

	s.shift() // Clear out the full match

	const v = s.map((x, i) => {
		if (!x && i === 3) return 1

		const y = parseFloat(x)
		if (isNaN(y)) {
			throw new RangeError(
				`Color is not a valid simple RGB format. Parse failed: \`${x}\`.`,
			)
		}

		return y
	})

	v[0] /= 255 // Red
	v[1] /= 255 // Green
	v[2] /= 255 // Blue

	return v as Color
}
