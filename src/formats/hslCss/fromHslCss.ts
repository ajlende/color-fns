import type { Color } from "../../types.js"

import fromHslString from "../hslString/fromHslString.js"

/**
 * Convert `hsl()` or `hsla()` to the intermediary Color format
 *
 * @param input `hsl()` or `hsla()` string
 *
 * @return Color in the intermediary format
 */
export default function fromHslCss(input: string): Color {
	// TODO: Implement the full specification.
	return fromHslString(input)
}
