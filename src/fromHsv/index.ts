import { Color, Hsv } from "../types"

/**
 * Converts a single hue to an RGB value
 *
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 *
 * @param min Minimum of the RGB values
 * @param max Maximum of the RGB values
 * @param h Color hue
 *
 * @returns RGB value
 */
function hueToRgb(min: number, max: number, h: number) {
	const h2 = ((h % 6) + 6) % 6
	if (h2 < 1) return (max - min) * h2 + min
	else if (h2 < 3) return max
	else if (h2 < 4) return (max - min) * (4 - h2) + min
	else return min
}

/**
 * Convert a HSV color to the intermediate format
 *
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 *
 * @param color HSVA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]
 *
 * @returns Color in the intermediary format
 */
export default function fromHsv({ h, s, v, a }: Hsv): Color {
	const h2 = h / 60
	const max = v
	const min = v - s * v
	const r = hueToRgb(min, max, h2 + 2)
	const g = hueToRgb(min, max, h2)
	const b = hueToRgb(min, max, h2 - 2)
	return [r, g, b, a]
}
