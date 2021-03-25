import { Color, Hsv } from "../types"

/**
 * Convert the intermediate format to a HSV color
 *
 * @see https://www.w3.org/TR/css-color-4/#hsv-to-rgb
 *
 * @param color Color in the intermediary format
 *
 * @returns HSVA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]
 */
export default function toHsv([r, g, b, a]: Color): Hsv {
	const c = { h: 0, s: 0, v: 0, a }

	const min = Math.min(r, g, b)
	const max = Math.max(r, g, b)

	c.v = max

	// When gray, saturation and hue are both zero
	if (min !== max) {
		const d = max - min

		c.s = d / max

		switch (max) {
			case r:
				c.h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				c.h = (b - r) / d + 2
				break
			case b:
				c.h = (r - g) / d + 4
				break
		}
		c.h *= 60
	}

	return c
}
