import { sRGB } from "../../../core/spaces.js"
import type { RgbString } from "./_utils.js"

const RGBA_REGEX =
	/rgba?\(\s*([\d.e+-]+)[\s,]+([\d.e+-]+)[\s,]+([\d.e+-]+)(?:[\s,]+([\d.e+-]+))?\s*\)/i

export function fromRgbString(color: RgbString): sRGB {
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

	return {
		r: v[0] / 255,
		g: v[1] / 255,
		b: v[2] / 255,
		alpha: v[3] ?? 1,
	} as sRGB
}
