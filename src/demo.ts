type Brand<B extends string, T> = T & {
	readonly __brand: B
}
type RawPayload<P> = P extends Brand<string, infer U> ? U : never

export type Linear_sRGB = Brand<
	"Linear_sRGB",
	{ r: number; g: number; b: number }
>
export type sRGB = Brand<"sRGB", { r: number; g: number; b: number }>
export type HSL = Brand<"HSL", { h: number; s: number; l: number }>
export type HSV = Brand<"HSV", { h: number; s: number; v: number }>
export type HWB = Brand<"HWB", { h: number; w: number; b: number }>

export interface ColorSpaceMap {
	Linear_sRGB: Linear_sRGB
	sRGB: sRGB
	HSL: HSL
	HSV: HSV
	HWB: HWB
}

export type RawColorSpaceMap = {
	[K in keyof ColorSpaceMap]: RawPayload<ColorSpaceMap[K]>
}

export type ColorSpace = keyof ColorSpaceMap

export type Converter<
	F extends keyof ColorSpaceMap,
	T extends keyof ColorSpaceMap,
> = (input: ColorSpaceMap[F]) => ColorSpaceMap[T]

export type Graph = Partial<{
	[F in ColorSpace]: Partial<{
		[T in ColorSpace]: Converter<F, T>
	}>
}>

export function findPath<F extends ColorSpace, T extends ColorSpace>(
	graph: Graph,
	from: F,
	to: T,
): [F, ...ColorSpace[], T] | [ColorSpace] {
	if (from === to) {
		return [from]
	}

	const queue: ColorSpace[][] = [[from]]
	const visited = new Set<ColorSpace>([from])

	while (queue.length > 0) {
		const path = queue.shift()
		if (!path) continue
		const last = path[path.length - 1]
		const neighbors = graph[last]
		if (neighbors) {
			for (const next of Object.keys(neighbors) as ColorSpace[]) {
				if (visited.has(next)) continue
				const newPath = path.concat(next)
				visited.add(next)
				if (next === to) {
					return newPath as [F, ...ColorSpace[], T]
				}
				queue.push(newPath)
			}
		}
	}

	throw new Error(`No conversion path found from ${from} to ${to}`)
}

export function composeConverters<F extends ColorSpace, T extends ColorSpace>(
	graph: Graph,
	path: ColorSpace[],
): Converter<F, T> {
	return (input: ColorSpaceMap[F]) => {
		let result = input
		for (let i = 0; i + 1 < path.length; i++) {
			const a = path[i]
			const b = path[i + 1]
			const fn = graph[a]![b]!
			result = fn(result)
		}
		return result
	}
}

export function createConvert(graph: Graph) {
	return function convert<F extends ColorSpace, T extends ColorSpace>(
		from: F,
		to: T,
		input: RawColorSpaceMap[F],
	): ColorSpaceMap[T] {
		const path = findPath(graph, from, to)
		const fn = composeConverters(graph, path)
		return fn(input as ColorSpaceMap[F])
	}
}

const linearSrgbToSrgb: Converter<"Linear_sRGB", "sRGB"> = (_) =>
	({ r: 0, g: 0, b: 0 }) as sRGB
const srgbToLinear: Converter<"sRGB", "Linear_sRGB"> = (_) =>
	({ r: 0, g: 0, b: 0 }) as Linear_sRGB

const srgbToHsl: Converter<"sRGB", "HSL"> = (_) => ({ h: 0, s: 0, l: 0 }) as HSL
const hslToSrgb: Converter<"HSL", "sRGB"> = (_) =>
	({ r: 0, g: 0, b: 0 }) as sRGB

const srgbToHsv: Converter<"sRGB", "HSV"> = (_) => ({ h: 0, s: 0, v: 0 }) as HSV
const hsvToSrgb: Converter<"HSV", "sRGB"> = (_) =>
	({ r: 0, g: 0, b: 0 }) as sRGB

const hsvToHwb: Converter<"HSV", "HWB"> = (_) => ({ h: 0, w: 0, b: 0 }) as HWB
const hwbToHsv: Converter<"HWB", "HSV"> = (_) => ({ h: 0, s: 0, v: 0 }) as HSV

const webGraph: Graph = {
	Linear_sRGB: { sRGB: linearSrgbToSrgb },
	sRGB: {
		Linear_sRGB: srgbToLinear,
		HSL: srgbToHsl,
		HSV: srgbToHsv,
	},
	HSL: { sRGB: hslToSrgb },
	HSV: {
		sRGB: hsvToSrgb,
		HWB: hsvToHwb,
	},
	HWB: { HSV: hwbToHsv },
}

export const convert: <F extends ColorSpace, T extends ColorSpace>(
	from: F,
	to: T,
	input: RawColorSpaceMap[F],
) => ColorSpaceMap[T] = createConvert(webGraph)

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

export type CssFunctionName = keyof CssStringMap

export const cssToSpace = {
	hex: "sRGB",
	rgb: "sRGB",
	hsl: "HSL",
	hwb: "HWB",
} as const
export type CssToSpace = typeof cssToSpace

export type DetectFn<S extends keyof CssStringMap> = (
	s: unknown,
) => s is CssStringMap[S]

export const detectHex: DetectFn<"hex"> = (s): s is CssStringMap["hex"] =>
	typeof s === "string" && s.startsWith("#")
export const detectRgb: DetectFn<"rgb"> = (s): s is CssStringMap["rgb"] =>
	typeof s === "string" && s.startsWith("rgb(")
export const detectHsl: DetectFn<"hsl"> = (s): s is CssStringMap["hsl"] =>
	typeof s === "string" && s.startsWith("hsl(")
export const detectHwb: DetectFn<"hwb"> = (s): s is CssStringMap["hwb"] =>
	typeof s === "string" && s.startsWith("hwb(")

export const detectMap: {
	[K in CssFunctionName]: DetectFn<K>
} = {
	hex: detectHex,
	rgb: detectRgb,
	hsl: detectHsl,
	hwb: detectHwb,
}

export interface ParsedCssColor<S extends CssFunctionName> {
	space: S
	data: ColorSpaceMap[CssToSpace[S]]
}
export type ParseFn<S extends CssFunctionName> = (
	input: string,
) => ParsedCssColor<S>

export const parseHex: ParseFn<"hex"> = (_) => ({
	space: "hex",
	data: { r: 0, g: 0, b: 0 } as sRGB,
})
export const parseRgb: ParseFn<"rgb"> = (_) => ({
	space: "rgb",
	data: { r: 0, g: 0, b: 0 } as sRGB,
})
export const parseHsl: ParseFn<"hsl"> = (_) => ({
	space: "hsl",
	data: { h: 0, s: 0, l: 0 } as HSL,
})
export const parseHwb: ParseFn<"hwb"> = (_) => ({
	space: "hwb",
	data: { h: 0, w: 0, b: 0 } as HWB,
})

export const parseMap: {
	[K in CssFunctionName]: ParseFn<K>
} = {
	hex: parseHex,
	rgb: parseRgb,
	hsl: parseHsl,
	hwb: parseHwb,
}

export type SerializeFn<S extends CssFunctionName> = (
	data: ColorSpaceMap[CssToSpace[S]],
) => CssStringMap[S]

export const serializeHex: SerializeFn<"hex"> = (_) => "#000" as HexCssString
export const serializeRgb: SerializeFn<"rgb"> = (_) =>
	"rgb(0 0 0)" as RgbCssString
export const serializeHsl: SerializeFn<"hsl"> = (_) =>
	"hsl(0deg 0% 0%)" as HslCssString
export const serializeHwb: SerializeFn<"hwb"> = (_) =>
	"hwb(0deg 0% 0%)" as HwbCssString

export const serializeMap: {
	[K in CssFunctionName]: SerializeFn<K>
} = {
	hex: serializeHex,
	rgb: serializeRgb,
	hsl: serializeHsl,
	hwb: serializeHwb,
}

export function convertCss<T extends CssFunctionName>(
	inputCss: unknown,
	to: T,
): CssStringMap[T] {
	const fnName = Object.keys(detectMap).find((k) => detectMap[k](inputCss))
	if (!fnName) {
		throw new Error(`Unsupported CSS color format: ${String(inputCss)}`)
	}

	const parsed = parseMap[fnName](inputCss)
	const fromSpace = cssToSpace[parsed.space]
	const toSpace = cssToSpace[to]
	const converted = convert(fromSpace, toSpace, parsed.data)

	return serializeMap[to](converted)
}

const outWeb = convert("HWB", "HSL", { h: 1, w: 0, b: 0.6 })
console.log(outWeb) // e.g. { h: 324, s: 1, l: 0.5 }

const outCss = convertCss("#f09", "hsl")
console.log(outCss) // e.g. "hsl(324deg 100% 50%)"
