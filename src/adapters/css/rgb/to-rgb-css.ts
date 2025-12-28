import type { sRGB } from "../../../core/spaces.js"
import type { RgbCss } from "./_utils.js"

export function toRgbCss(input: sRGB): RgbCss {
	if (input.alpha === 1) {
		return `rgb(${input.r}% ${input.g}% ${input.b}%)`
	}

	return `rgba(${input.r}% ${input.g}% ${input.b}% / ${input.alpha})`
}
