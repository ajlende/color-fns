import type { sRGB, HSL } from "../_utils.js"

import { srgbToHsl } from "../convert/srgb-to-hsl.js"
import { hslToSrgb } from "../convert/hsl-to-srgb.js"

import type { ColorSpaceGraph, DynamicConverter } from "./_utils.js"

import { dynamicConverter } from "./_utils.js"

export type CssLevel3Color = sRGB | HSL

const cssColor3Graph: ColorSpaceGraph<CssLevel3Color> = {
	sRGB: {
		HSL: srgbToHsl,
	},
	HSL: {
		sRGB: hslToSrgb,
	},
}
export const convertCssColor3: DynamicConverter<CssLevel3Color> =
	dynamicConverter(cssColor3Graph)
