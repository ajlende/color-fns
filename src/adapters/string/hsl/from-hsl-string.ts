import type { HSL } from "../../../core/spaces.js"
import type { HslString } from "./_utils.js"

const HSLA_REGEX =
	/hsla?\(\s*([\d.e+-]+)[\s,]+([\d.e+-]+)%[\s,]+([\d.e+-]+)%(?:[\s,]+([\d.e+-]+))?\s*\)/i

export function fromHslString(color: HslString): HSL {
	const r = HSLA_REGEX.exec(color)
	if (!r) {
		throw new RangeError(
			`Color is not a valid hsl format. Regex failed: ${color}.`,
		)
	}

	const v = { h: 0, s: 0, l: 0, alpha: 1 } as HSL

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
		v.alpha = parseFloat(r[4])
		if (isNaN(v.alpha)) {
			throw new RangeError(
				`Color is not a valid hsl format. Alpha parse failed: ${r[4]}.`,
			)
		}
	}

	return v
}
