import { Color, Hsl } from "../types"

/**
 * Convert the intermediate format to a HSL color
 *
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 *
 * @param color Color in the intermediary format
 *
 * @returns HSLA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]
 */
export default function toHsl([r, g, b, a]: Color): Hsl {
	const v = { h: 0, s: 0, l: 0, a }

	const min = Math.min(r, g, b)
	const max = Math.max(r, g, b)

	v.l = (min + max) / 2

	// When gray, saturation and hue are both zero
	if (min !== max) {
		const d = max - min

		v.s = v.l > 0.5 ? d / (2 - max - min) : d / (min + max)

		switch (max) {
			case r:
				v.h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				v.h = (b - r) / d + 2
				break
			case b:
				v.h = (r - g) / d + 4
				break
		}
		v.h *= 60
	}

	return v
}
