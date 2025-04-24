import type { sRGB, HSL } from "../_utils.js"

import { srgbToHsl } from "../convert/srgb-to-hsl.js"
import { hslToSrgb } from "../convert/hsl-to-srgb.js"

import type { Graph, GraphConverter } from "./_utils.js"

import { createConvert } from "./_utils.js"

export type CssColor3ColorSpace = sRGB | HSL

const cssColor3Graph: Graph<CssColor3ColorSpace> = {
	sRGB: {
		HSL: srgbToHsl,
	},
	HSL: {
		sRGB: hslToSrgb,
	},
}
export const convertWeb: GraphConverter<CssColor3ColorSpace> =
	createConvert(cssColor3Graph)
