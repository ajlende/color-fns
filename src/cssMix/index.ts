import { Color } from "../types"

// <rectangular-color-space> = srgb | srgb-linear | lab | oklab | xyz | xyz-d50 | xyz-d65
type RectangularColorspace =
	| "srgb"
	| "srgb-linear"
	| "lab"
	| "oklab"
	| "xyz"
	| "xyz-d50"
	| "xyz-d65"
// <polar-color-space> = hsl | hwb | lch | oklch
type PolarColorspace = "hsl" | "hwb" | "lch" | "oklch"
// <color-space> = <rectangular-color-space> | <polar-color-space>
type ColorSpace = RectangularColorspace | PolarColorspace
// <hue-interpolation-method> = [ shorter | longer | increasing | decreasing ] hue
type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing"
// <color-interpolation-method> = in [ <rectangular-color-space> | <polar-color-space> <hue-interpolation-method>? ]
type ColorInterpolationMethod<T> = T extends PolarColorspace
	? HueInterpolationMethod
	: never

// rgb, hsl, hwb interpolated in srgb
// others interpolated in oklab

interface CssMixArgs<T extends ColorSpace> {
	in: T
	hue?: ColorInterpolationMethod<T>
	colorA: Color
	percentA?: number
	colorB: Color
	percentB?: number
}

interface AnglePair {
	a: number
	b: number
}

interface AngleAdjust {
	({ a, b }: AnglePair): AnglePair
}

const hueInterpolationMethods: {
	[key in HueInterpolationMethod]: AngleAdjust
} = {
	shorter: ({ a, b }) => ({
		a: b - a > 180 ? a + 360 : a,
		b: b - a < 180 ? b + 360 : b,
	}),
	longer: ({ a, b }) => ({
		a: b - a > 0 && b - a < 180 ? a + 360 : a,
		b: b - a > -180 && b - a <= 0 ? b + 360 : b,
	}),
	increasing: ({ a, b }) => ({
		a,
		b: b < a ? b + 360 : b,
	}),
	decreasing: ({ a, b }) => ({
		a: a < b ? a + 360 : a,
		b,
	}),
}

/**
 * Convert a color from one representation to another.
 *
 * @param fromFn Function to convert from
 * @param toFn Function to convert to
 * @param color Input color to convert
 *
 *
 *
 * @return Converted color
 */
export default function cssMix<T extends ColorSpace>({
	in: colorspace,
	hue: angleMethod,
	colorA,
	percentA,
	colorB,
	percentB,
}: CssMixArgs<T>): Color {}
