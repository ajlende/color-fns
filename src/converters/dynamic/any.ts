import type {
	HSL,
	HSV,
	HWB,
	sRGB_Linear,
	sRGB,
	XYZ_D65,
} from "../../core/_utils.js"

import { hslToSrgb } from "../direct/hsl-to-srgb.js"
import { hsvToHwb } from "../direct/hsv-to-hwb.js"
import { hsvToSrgb } from "../direct/hsv-to-srgb.js"
import { hwbToHsv } from "../direct/hwb-to-hsv.js"
import { srgbLinearToSrgb } from "../direct/srgb-linear-to-srgb.js"
import { srgbLinearToXyzD65 } from "../direct/srgb-linear-to-xyz-d65.js"
import { srgbToHsl } from "../direct/srgb-to-hsl.js"
import { srgbToHsv } from "../direct/srgb-to-hsv.js"
import { srgbToSrgbLinear } from "../direct/srgb-to-srgb-linear.js"
import { xyzD65ToSrgbLinear } from "../direct/xyz-d65-to-srgb-linear.js"

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
