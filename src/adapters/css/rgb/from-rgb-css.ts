import type { sRGB } from "../../../core/spaces.js"
import { fromRgbString } from "../../string/rgb/from-rgb-string.js"

import type { RgbCss } from "./_utils.js"

export function fromRgbCss(input: RgbCss): sRGB {
	// TODO: Implement the full specification.
	return fromRgbString(input)
}
