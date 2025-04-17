import type { Color } from "../../../types.js"

import fromRgbString from "../../string/rgbString/fromRgbString.js"

/**
 * Convert `rgb()` or `rgba()` to the intermediary Color format
 *
 * @param input `rgb()` or `rgba()` string
 *
 * @return Color in the intermediary format
 */
export default function fromRgbCss(input: string): Color {
	// TODO: Implement the full specification.
	return fromRgbString(input)
}
