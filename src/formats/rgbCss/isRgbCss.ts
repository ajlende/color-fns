import isRgbString from "../rgbString/isRgbString.js"

import { RgbCss } from "./types.js"

export default function isRgbCss(value: unknown): value is RgbCss {
	// TODO: Implement the full specification.
	return isRgbString(value)
}
