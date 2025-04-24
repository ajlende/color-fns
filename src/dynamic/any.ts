import type { HSL, HSV, HWB, sRGB_Linear, sRGB, XYZ_D65 } from "../_utils.js"

import { hslToSrgb } from "../convert/hsl-to-srgb.js"
import { hsvToHwb } from "../convert/hsv-to-hwb.js"
import { hsvToSrgb } from "../convert/hsv-to-srgb.js"
import { hwbToHsv } from "../convert/hwb-to-hsv.js"
import { srgbLinearToSrgb } from "../convert/srgb-linear-to-srgb.js"
import { srgbLinearToXyzD65 } from "../convert/srgb-linear-to-xyz-d65.js"
import { srgbToHsl } from "../convert/srgb-to-hsl.js"
import { srgbToHsv } from "../convert/srgb-to-hsv.js"
import { srgbToSrgbLinear } from "../convert/srgb-to-srgb-linear.js"
import { xyzD65ToSrgbLinear } from "../convert/xyz-d65-to-srgb-linear.js"

import type { Graph, GraphConverter } from "./_utils.js"

import { createConvert } from "./_utils.js"

export type AnyColorSpace = HSL | HSV | HWB | sRGB | sRGB_Linear | XYZ_D65

const anyGraph: Graph<AnyColorSpace> = {
	HSL: {
		sRGB: hslToSrgb,
	},
	HSV: {
		HWB: hsvToHwb,
		sRGB: hsvToSrgb,
	},
	HWB: {
		HSV: hwbToHsv,
	},
	sRGB: {
		HSL: srgbToHsl,
		HSV: srgbToHsv,
		sRGB_Linear: srgbToSrgbLinear,
	},
	sRGB_Linear: {
		sRGB: srgbLinearToSrgb,
		XYZ_D65: srgbLinearToXyzD65,
	},
	XYZ_D65: {
		sRGB_Linear: xyzD65ToSrgbLinear,
	},
}

export const convertAny: GraphConverter<AnyColorSpace> = createConvert(anyGraph)
