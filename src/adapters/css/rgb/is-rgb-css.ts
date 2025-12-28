import { isRgbString } from "../../string/rgb/is-rgb-string.js"

import { RgbCss } from "./_utils.js"

export function isRgbCss(value: unknown): value is RgbCss {
	// TODO: Implement the full specification.
	return isRgbString(value)
}
