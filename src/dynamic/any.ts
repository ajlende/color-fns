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

import type { ColorSpaceGraph, DynamicConverter } from "./_utils.js"

import { dynamicConverter } from "./_utils.js"

export type AnyColor = HSL | HSV | HWB | sRGB | sRGB_Linear | XYZ_D65

const anyGraph: ColorSpaceGraph<AnyColor> = {
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

/**
 * Convert colors between any two color spaces.
 *
 * @param from - The color space to convert from.
 * @param to - The color space to convert to.
 * @param input - The color to convert.
 *
 * @example
 * ```ts
 * const color = convertAny("sRGB", "HWB", { r: 0, g: 0, b: 0 })
 * // => { h: 0, w: 0, b: 1 }
 * ```
 */
export const convertAny: DynamicConverter<AnyColor> = dynamicConverter(anyGraph)
