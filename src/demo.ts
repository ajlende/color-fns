// -------------------
// Branding
// -------------------

type Brand<B extends string, T> = T & {
	readonly __brand: B
}

// -------------------
// Color Spaces
// -------------------

export interface ColorDataMap {
	Linear_sRGB: { r: number; g: number; b: number }
	sRGB: { r: number; g: number; b: number }
	HSL: { h: number; s: number; l: number }
	HSV: { h: number; s: number; v: number }
	HWB: { h: number; w: number; b: number }
	XYZ_D65: { x: number; y: number; z: number }
	XYZ_D50: { x: number; y: number; z: number }
	Jzazbz: { jz: number; az: number; bz: number }
	JzCzHz: { jz: number; cz: number; hz: number }
	Lab_D50: { l: number; a: number; b: number }
	LCH: { l: number; c: number; h: number }
	Linear_ProPhoto: { r: number; g: number; b: number }
	ProPhoto: { r: number; g: number; b: number }
}

export type ColorSpaceMap = {
	[K in keyof ColorDataMap]: Brand<K, ColorDataMap[K]>
}

export type Linear_sRGB = ColorSpaceMap["Linear_sRGB"]
export type sRGB = ColorSpaceMap["sRGB"]
export type HSL = ColorSpaceMap["HSL"]
export type HSV = ColorSpaceMap["HSV"]
export type HWB = ColorSpaceMap["HWB"]
export type XYZ_D65 = ColorSpaceMap["XYZ_D65"]
export type XYZ_D50 = ColorSpaceMap["XYZ_D50"]
export type Jzazbz = ColorSpaceMap["Jzazbz"]
export type JzCzHz = ColorSpaceMap["JzCzHz"]
export type Lab_D50 = ColorSpaceMap["Lab_D50"]
export type LCH = ColorSpaceMap["LCH"]
export type Linear_ProPhoto = ColorSpaceMap["Linear_ProPhoto"]
export type ProPhoto = ColorSpaceMap["ProPhoto"]

export type XYZ = XYZ_D65

export type Converter<
	F extends keyof ColorSpaceMap,
	T extends keyof ColorSpaceMap,
> = (input: ColorDataMap[F]) => ColorSpaceMap[T]

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed converters
const linearSrgbToXyzD65: Converter<"Linear_sRGB", "XYZ_D65"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D65
const xyzD65ToLinearSrgb: Converter<"XYZ_D65", "Linear_sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as Linear_sRGB

const linearSrgbToSrgb: Converter<"Linear_sRGB", "sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB
const srgbToLinear: Converter<"sRGB", "Linear_sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as Linear_sRGB

const srgbToHsl: Converter<"sRGB", "HSL"> = (_input) =>
	({ h: 0, s: 0, l: 0 }) as HSL
const hslToSrgb: Converter<"HSL", "sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB

const srgbToHsv: Converter<"sRGB", "HSV"> = (_input) =>
	({ h: 0, s: 0, v: 0 }) as HSV
const hsvToSrgb: Converter<"HSV", "sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB

const hsvToHwb: Converter<"HSV", "HWB"> = (_input) =>
	({ h: 0, w: 0, b: 0 }) as HWB
const hwbToHsv: Converter<"HWB", "HSV"> = (_input) =>
	({ h: 0, s: 0, v: 0 }) as HSV

const xyzD65ToXyzD50: Converter<"XYZ_D65", "XYZ_D50"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D50
const xyzD50ToXyzD65: Converter<"XYZ_D50", "XYZ_D65"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D65

const xyzD50ToJzazbz: Converter<"XYZ_D50", "Jzazbz"> = (_input) =>
	({ jz: 0, az: 0, bz: 0 }) as Jzazbz
const jzazbzToXyzD50: Converter<"Jzazbz", "XYZ_D50"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D50

const xyzD50ToLabD50: Converter<"XYZ_D50", "Lab_D50"> = (_input) =>
	({ l: 0, a: 0, b: 0 }) as Lab_D50
const labD50ToXyzD50: Converter<"Lab_D50", "XYZ_D50"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D50

const xyzD50ToLinearProPhoto: Converter<"XYZ_D50", "Linear_ProPhoto"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as Linear_ProPhoto
const linearProPhotoToXyzD50: Converter<"Linear_ProPhoto", "XYZ_D50"> = (
	_input,
) => ({ x: 0, y: 0, z: 0 }) as XYZ_D50

const jzazbzToJzCzHz: Converter<"Jzazbz", "JzCzHz"> = (_input) =>
	({ jz: 0, cz: 0, hz: 0 }) as JzCzHz
const jzCzHzToJzazbz: Converter<"JzCzHz", "Jzazbz"> = (_input) =>
	({ jz: 0, az: 0, bz: 0 }) as Jzazbz

const labD50ToLch: Converter<"Lab_D50", "LCH"> = (_input) =>
	({ l: 0, c: 0, h: 0 }) as LCH
const lchToLabD50: Converter<"LCH", "Lab_D50"> = (_input) =>
	({ l: 0, a: 0, b: 0 }) as Lab_D50

const linearProPhotoToProPhoto: Converter<"Linear_ProPhoto", "ProPhoto"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as ProPhoto
const proPhotoToLinearProPhoto: Converter<"ProPhoto", "Linear_ProPhoto"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as Linear_ProPhoto
/* eslint-enable @typescript-eslint/no-unused-vars */

function pipe<T>(...fns: ((input: T) => T)[]): (input: T) => T {
	return (input: T) => fns.reduce((acc, fn) => fn(acc), input)
}

export type Graph<K extends keyof ColorSpaceMap> = Partial<{
	[F in K]: Partial<{ [T in K]: Converter<F, T> }>
}>

export function findPath<K extends keyof ColorSpaceMap>(
	graph: Graph<K>,
	from: K,
	to: K,
): K[] {
	if (from === to) {
		return [from]
	}

	const queue: K[][] = [[from]]
	const visited = new Set<K>([from])

	while (queue.length > 0) {
		const path = queue.shift()
		if (!path) continue
		const last = path[path.length - 1]
		const neighbors = graph[last]
		if (!neighbors) continue
		for (const next of Object.keys(neighbors) as K[]) {
			if (visited.has(next)) continue
			const newPath = path.concat(next)
			visited.add(next)
			if (next === to) {
				return newPath
			}
			queue.push(newPath)
		}
	}

	throw new Error(`No conversion path found from ${from} to ${to}`)
}

export function composeConverters<
	K extends keyof ColorSpaceMap,
	F extends K,
	T extends K,
>(graph: Graph<K>, path: K[]): Converter<F, T> {
	return (input: ColorSpaceMap[F]) => {
		let result: ColorSpaceMap[K] = input
		for (let i = 0; i + 1 < path.length; i++) {
			const a = path[i]
			const b = path[i + 1]
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			result = graph[a]![b]!(result)
		}
		return result as ColorSpaceMap[T]
	}
}

export type GraphConvert<K extends keyof ColorSpaceMap> = <
	F extends K,
	T extends K,
>(
	from: F,
	to: T,
	input: ColorDataMap[F],
) => ColorSpaceMap[T]

export function createConvert<K extends keyof ColorSpaceMap>(
	graph: Graph<K>,
): GraphConvert<K> {
	return <F extends K, T extends K>(from: F, to: T, input: ColorDataMap[F]) => {
		const path = findPath(graph, from, to)
		const fn = composeConverters<K, F, T>(graph, path)
		return fn(input)
	}
}

// @lib/colors/dynamic/web
export const convertWeb: GraphConvert<
	"Linear_sRGB" | "sRGB" | "HSL" | "HSV" | "HWB"
> = createConvert({
	Linear_sRGB: {
		sRGB: linearSrgbToSrgb,
	},
	sRGB: {
		Linear_sRGB: srgbToLinear,
		HSL: srgbToHsl,
		HSV: srgbToHsv,
	},
	HSL: {
		sRGB: hslToSrgb,
	},
	HSV: {
		sRGB: hsvToSrgb,
		HWB: hsvToHwb,
	},
	HWB: {
		HSV: hwbToHsv,
	},
})

// @lib/colors/dynamic/d50
export const convertD50: GraphConvert<
	| "XYZ_D50"
	| "Jzazbz"
	| "JzCzHz"
	| "Lab_D50"
	| "LCH"
	| "Linear_ProPhoto"
	| "ProPhoto"
> = createConvert({
	XYZ_D50: {
		Jzazbz: xyzD50ToJzazbz,
		Lab_D50: xyzD50ToLabD50,
		Linear_ProPhoto: xyzD50ToLinearProPhoto,
	},
	Jzazbz: {
		JzCzHz: jzazbzToJzCzHz,
		XYZ_D50: jzazbzToXyzD50,
	},
	JzCzHz: {
		Jzazbz: jzCzHzToJzazbz,
	},
	Lab_D50: {
		LCH: labD50ToLch,
		XYZ_D50: labD50ToXyzD50,
	},
	LCH: {
		Lab_D50: lchToLabD50,
	},
	Linear_ProPhoto: {
		ProPhoto: linearProPhotoToProPhoto,
		XYZ_D50: linearProPhotoToXyzD50,
	},
	ProPhoto: {
		Linear_ProPhoto: proPhotoToLinearProPhoto,
	},
})

// @lib/colors/dynamic
export const convert: GraphConvert<
	| "Linear_sRGB"
	| "sRGB"
	| "HSL"
	| "HSV"
	| "HWB"
	| "XYZ_D65"
	| "XYZ_D50"
	| "Jzazbz"
	| "JzCzHz"
	| "Lab_D50"
	| "LCH"
	| "Linear_ProPhoto"
	| "ProPhoto"
> = createConvert({
	XYZ_D65: {
		XYZ_D50: xyzD65ToXyzD50,
		Linear_sRGB: xyzD65ToLinearSrgb,
	},
	XYZ_D50: {
		XYZ_D65: xyzD50ToXyzD65,
		Jzazbz: xyzD50ToJzazbz,
		Lab_D50: xyzD50ToLabD50,
		Linear_ProPhoto: xyzD50ToLinearProPhoto,
	},
	Jzazbz: {
		JzCzHz: jzazbzToJzCzHz,
		XYZ_D50: jzazbzToXyzD50,
	},
	JzCzHz: {
		Jzazbz: jzCzHzToJzazbz,
	},
	Lab_D50: {
		LCH: labD50ToLch,
		XYZ_D50: labD50ToXyzD50,
	},
	LCH: {
		Lab_D50: lchToLabD50,
	},
	Linear_ProPhoto: {
		ProPhoto: linearProPhotoToProPhoto,
		XYZ_D50: linearProPhotoToXyzD50,
	},
	ProPhoto: {
		Linear_ProPhoto: proPhotoToLinearProPhoto,
	},
	Linear_sRGB: {
		XYZ_D65: linearSrgbToXyzD65,
		sRGB: linearSrgbToSrgb,
	},
	sRGB: {
		Linear_sRGB: srgbToLinear,
		HSL: srgbToHsl,
		HSV: srgbToHsv,
	},
	HSL: {
		sRGB: hslToSrgb,
	},
	HSV: {
		sRGB: hsvToSrgb,
		HWB: hsvToHwb,
	},
	HWB: {
		HSV: hwbToHsv,
	},
})

// -------------------
// String Formats
// -------------------

export type HexCssString = Brand<"hex", `#${string}`>
export type RgbCssString = Brand<"rgb", `rgb(${string})`>
export type HslCssString = Brand<"hsl", `hsl(${string})`>
export type HwbCssString = Brand<"hwb", `hwb(${string})`>

export interface CssStringMap {
	hex: HexCssString
	rgb: RgbCssString
	hsl: HslCssString
	hwb: HwbCssString
}

export const cssToSpace = {
	hex: "sRGB",
	rgb: "sRGB",
	hsl: "HSL",
	hwb: "HWB",
} as const
export type CssToSpace = typeof cssToSpace

export type DetectFn<S extends keyof CssStringMap> = (
	input: unknown,
) => input is CssStringMap[S]

// TODO: Implement stubbed detect functions
export const detectHex: DetectFn<"hex"> = (
	input,
): input is CssStringMap["hex"] =>
	typeof input === "string" && input.startsWith("#")
export const detectRgb: DetectFn<"rgb"> = (
	input,
): input is CssStringMap["rgb"] =>
	typeof input === "string" && input.startsWith("rgb(")
export const detectHsl: DetectFn<"hsl"> = (
	input,
): input is CssStringMap["hsl"] =>
	typeof input === "string" && input.startsWith("hsl(")
export const detectHwb: DetectFn<"hwb"> = (
	input,
): input is CssStringMap["hwb"] =>
	typeof input === "string" && input.startsWith("hwb(")

export interface ParsedCssColor<S extends keyof CssStringMap> {
	space: S
	data: ColorSpaceMap[CssToSpace[S]]
}
export type ParseFn<S extends keyof CssStringMap> = (
	input: string,
) => ParsedCssColor<S>

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed parse functions
export const parseHex: ParseFn<"hex"> = (_input) => ({
	space: "hex",
	data: { r: 0, g: 0, b: 0 } as sRGB,
})
export const parseRgb: ParseFn<"rgb"> = (_input) => ({
	space: "rgb",
	data: { r: 0, g: 0, b: 0 } as sRGB,
})
export const parseHsl: ParseFn<"hsl"> = (_input) => ({
	space: "hsl",
	data: { h: 0, s: 0, l: 0 } as HSL,
})
export const parseHwb: ParseFn<"hwb"> = (_input) => ({
	space: "hwb",
	data: { h: 0, w: 0, b: 0 } as HWB,
})
/* eslint-enable @typescript-eslint/no-unused-vars */

export type SerializeFn<S extends keyof CssStringMap> = (
	data: ColorSpaceMap[CssToSpace[S]],
) => CssStringMap[S]

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed serialize functions
export const serializeHex: SerializeFn<"hex"> = (_data) =>
	"#000" as HexCssString
export const serializeRgb: SerializeFn<"rgb"> = (_data) =>
	"rgb(0 0 0)" as RgbCssString
export const serializeHsl: SerializeFn<"hsl"> = (_data) =>
	"hsl(0deg 0% 0%)" as HslCssString
export const serializeHwb: SerializeFn<"hwb"> = (_data) =>
	"hwb(0deg 0% 0%)" as HwbCssString
/* eslint-enable @typescript-eslint/no-unused-vars */

export interface CssDef<S extends keyof CssStringMap> {
	space: CssToSpace[S]
	detect: DetectFn<S>
	parse: ParseFn<S>
	serialize: SerializeFn<S>
}

export const cssDefs: {
	[K in keyof CssStringMap]: CssDef<K>
} = {
	hex: {
		space: "sRGB",
		detect: detectHex,
		parse: parseHex,
		serialize: serializeHex,
	},
	rgb: {
		space: "sRGB",
		detect: detectRgb,
		parse: parseRgb,
		serialize: serializeRgb,
	},
	hsl: {
		space: "HSL",
		detect: detectHsl,
		parse: parseHsl,
		serialize: serializeHsl,
	},
	hwb: {
		space: "HWB",
		detect: detectHwb,
		parse: parseHwb,
		serialize: serializeHwb,
	},
}

export function convertCss<T extends keyof CssStringMap>(
	inputCss: unknown,
	to: T,
): CssStringMap[T] {
	for (const key of Object.keys(cssDefs) as (keyof CssStringMap)[]) {
		const def = cssDefs[key]
		if (def.detect(inputCss)) {
			const parsed = def.parse(inputCss)
			const fromSpace = def.space
			const toSpace = cssToSpace[to]
			const converted = convertWeb(fromSpace, toSpace, parsed.data)
			return def.serialize(converted) as CssStringMap[T]
		}
	}
	throw new Error(`Unsupported CSS color format: ${String(inputCss)}`)
}

// -------------------
// Demo
// -------------------

const pipeOut = pipe(hwbToHsv, hsvToSrgb, srgbToHsl)({ h: 1, w: 0, b: 0.6 })
console.log(pipeOut) // e.g. { h: 324, s: 1, l: 0.5 }

const outD50 = convertD50("Jzazbz", "Lab_D50", { jz: 0, az: 0, bz: 0 })
console.log(outD50) // e.g. { l: 0, a: 0, b: 0 }

const outWeb = convertWeb("HWB", "HSL", { h: 1, w: 0, b: 0.6 })
console.log(outWeb) // e.g. { h: 324, s: 1, l: 0.5 }

const out = convert("Jzazbz", "HSL", { jz: 0, az: 0, bz: 0 })
console.log(out) // e.g. { h: 324, s: 1, l: 0.5 }

const outCss = convertCss("#f09", "hsl")
console.log(outCss) // e.g. "hsl(324deg 100% 50%)"
