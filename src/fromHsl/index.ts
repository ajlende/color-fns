import { Color, Hsl } from "../types"

/**
 * Converts a single hue to an RGB value
 *
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 *
 * @param t1 Lightness/saturation first coordinate
 * @param t2 Lightness/saturation second coordinate
 * @param h Color hue
 *
 * @returns RGB value
 */
function hueToRgb(t1: number, t2: number, h: number) {
	const h2 = ((h % 6) + 6) % 6
	if (h2 < 1) return (t2 - t1) * h2 + t1
	else if (h2 < 3) return t2
	else if (h2 < 4) return (t2 - t1) * (4 - h2) + t1
	else return t1
}

/**
 * Convert a HSL color to the intermediate format
 *
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 *
 * @param color HSLA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]
 *
 * @returns Color in the intermediary format
 */
export default function fromHsl({ h, s, l, a }: Hsl): Color {
	const h2 = h / 60
	const t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s
	const t1 = l * 2 - t2
	const r = hueToRgb(t1, t2, h2 + 2)
	const g = hueToRgb(t1, t2, h2)
	const b = hueToRgb(t1, t2, h2 - 2)
	return [r, g, b, a]
}
