// src/colorSpaces.ts
// ─────────────────
// The master map of *all* color‑space payloads.
// Every key here is a node in our conversion graph.
export interface ColorSpaceMap {
	Linear_sRGB: { r: number; g: number; b: number }
	sRGB: { r: number; g: number; b: number }
	HSL: { h: number; s: number; l: number }
	HSV: { h: number; s: number; v: number }
	HWB: { h: number; w: number; b: number }
	// … other spaces (ProPhoto, Jzazbz, …) omitted for brevity
}

// src/dynamic/convert.ts
// ──────────────────────
// import type { ColorSpaceMap } from "../colorSpaces"

// A converter from F → T
export type Converter<
	F extends keyof ColorSpaceMap,
	T extends keyof ColorSpaceMap,
> = (x: ColorSpaceMap[F]) => ColorSpaceMap[T]

// every F→T edge is correctly tracked by its own Converter<F,T>
export type Graph = Partial<{
	[F in keyof ColorSpaceMap]: Partial<{
		[T in keyof ColorSpaceMap]: Converter<F, T>
	}>
}>

// findPath just returns a list of keys;
// we cast it down to a tuple [F, …, T] later
export function findPath(
	graph: Graph,
	from: keyof ColorSpaceMap,
	to: keyof ColorSpaceMap,
): (keyof ColorSpaceMap)[] {
	// stub: find the shortest path (list of node‑keys) from → to
	return []
}

// compose a single Converter<F,T> out of the primitive edges
export function composeConverters<
	F extends keyof ColorSpaceMap,
	T extends keyof ColorSpaceMap,
>(graph: Graph, path: [F, ...(keyof ColorSpaceMap)[], T]): Converter<F, T> {
	return ((input: ColorSpaceMap[F]) => {
		let cur: unknown = input
		for (let i = 0; i + 1 < path.length; i++) {
			const a = path[i] as F
			const b = path[i + 1] as T
			// we know graph[a]![b] is Converter<F,T>
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const fn = graph[a]![b]!
			cur = fn(cur as ColorSpaceMap[typeof a])
		}
		return cur as ColorSpaceMap[T]
	}) as Converter<F, T>
}

// Factory: given *one* graph, produce its `convert` function
export function createConvert(graph: Graph) {
	return function convert<
		F extends keyof ColorSpaceMap,
		T extends keyof ColorSpaceMap,
	>(from: F, to: T, input: ColorSpaceMap[F]): ColorSpaceMap[T] {
		// TS can’t infer the tuple-ness of findPath’s result,
		// so we assert it to [F,...,T]
		const path = findPath(graph, from, to) as [F, ...(keyof ColorSpaceMap)[], T]
		const fn = composeConverters(graph, path)
		return fn(input)
	}
}

// src/dynamic/web.ts
// ─────────────────
// A “web” subset: Linear_sRGB↔sRGB↔HSL↔HSV↔HWB

// import type { ColorSpaceMap } from "../colorSpaces"
// import type { Graph, Converter } from "./convert"
// import { createConvert } from "./convert"

// Primitive stubs (all bodies empty)
const linearSrgbToSrgb: Converter<"Linear_sRGB", "sRGB"> = (_) => ({
	r: 0,
	g: 0,
	b: 0,
})
const srgbToLinear: Converter<"sRGB", "Linear_sRGB"> = (_) => ({
	r: 0,
	g: 0,
	b: 0,
})

const srgbToHsl: Converter<"sRGB", "HSL"> = (_) => ({ h: 0, s: 0, l: 0 })
const hslToSrgb: Converter<"HSL", "sRGB"> = (_) => ({ r: 0, g: 0, b: 0 })

const srgbToHsv: Converter<"sRGB", "HSV"> = (_) => ({ h: 0, s: 0, v: 0 })
const hsvToSrgb: Converter<"HSV", "sRGB"> = (_) => ({ r: 0, g: 0, b: 0 })

const srgbToHwb: Converter<"sRGB", "HWB"> = (_) => ({ h: 0, w: 0, b: 0 })
const hwbToSrgb: Converter<"HWB", "sRGB"> = (_) => ({ r: 0, g: 0, b: 0 })

// Build the adjacency‐list
const webGraph: Graph = {
	Linear_sRGB: { sRGB: linearSrgbToSrgb },
	sRGB: {
		Linear_sRGB: srgbToLinear,
		HSL: srgbToHsl,
		HSV: srgbToHsv,
		HWB: srgbToHwb,
	},
	HSL: { sRGB: hslToSrgb },
	HSV: { sRGB: hsvToSrgb },
	HWB: { sRGB: hwbToSrgb },
}

// The only export users need for “dynamic/web”
export const convertWeb: <
	F extends keyof ColorSpaceMap,
	T extends keyof ColorSpaceMap,
>(
	from: F,
	to: T,
	input: ColorSpaceMap[F],
) => ColorSpaceMap[T] = createConvert(webGraph)

// export type { Converter } from "./convert"

// src/dynamic/css.ts
// ─────────────────
// Parse *any* CSS Color Level 5 string → internal space/data → convert → output string

// import { convert } from "./web"
// import type { Converter } from "./convert"
// import type { ColorSpaceMap } from "../colorSpaces"

// 1) Brand definitions, one per CSS syntax
export type HexCssString = `#${string}` & { readonly __brand: "hex" }
export type RgbCssString = `rgb(${string})` & { readonly __brand: "rgb" }
export type HslCssString = `hsl(${string})` & { readonly __brand: "hsl" }
export type HwbCssString = `hwb(${string})` & { readonly __brand: "hwb" }

// 3) Map each function name to its branded input/output string
export interface CssStringMap {
	hex: HexCssString
	rgb: RgbCssString
	hsl: HslCssString
	hwb: HwbCssString
}

// 4) Supported CSS keys
export type CssFunctionName = keyof CssStringMap

// 5) Map from CSS key → internal color‑space
export const cssToSpace = {
	hex: "sRGB",
	rgb: "sRGB",
	hsl: "HSL",
	hwb: "HWB",
} as const
type CssToSpace = typeof cssToSpace

// 6) Per‑syntax detectors (each lives in its own module if you like)
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

// 7) Build the detectMap so each branch can be tree‑shaken
export const detectMap: {
	[K in CssFunctionName]: DetectFn<K>
} = {
	hex: detectHex,
	rgb: detectRgb,
	hsl: detectHsl,
	hwb: detectHwb,
}

// 8) Parsers still accept `string` and produce a typed payload
//    (we could require branded input, but we detect+cast below instead)
export interface ParsedCssColor<S extends CssFunctionName> {
	space: S
	data: ColorSpaceMap[CssToSpace[S]]
}
export type ParseFn<S extends CssFunctionName> = (
	input: string,
) => ParsedCssColor<S>

// stub parsers
export const parseHex: ParseFn<"hex"> = (_) => ({
	space: "hex",
	data: { r: 1, g: 0, b: 0.6 }, // stub
})
export const parseRgb: ParseFn<"rgb"> = (_) => ({
	space: "rgb",
	data: { r: 0, g: 0, b: 0 }, // stub
})
export const parseHsl: ParseFn<"hsl"> = (_) => ({
	space: "hsl",
	data: { h: 0, s: 0, l: 0 }, // stub
})
export const parseHwb: ParseFn<"hwb"> = (_) => ({
	space: "hwb",
	data: { h: 0, w: 0, b: 0 }, // stub
})

export const parseMap: {
	[K in CssFunctionName]: ParseFn<K>
} = {
	hex: parseHex,
	rgb: parseRgb,
	hsl: parseHsl,
	hwb: parseHwb,
}

// 9) Serializers produce *branded* CSS strings
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

// 10) The type‑safe, end‑to‑end CSS converter
export function convertCss<To extends CssFunctionName>(
	inputCss: unknown,
	to: To,
): CssStringMap[To] {
	// a) pick the correct syntax via type‑guards
	const fnName = (Object.keys(detectMap) as CssFunctionName[]).find(
		(k): k is CssFunctionName => detectMap[k](inputCss),
	)
	if (!fnName) {
		throw new Error(`Unsupported CSS color format: ${String(inputCss)}`)
	}

	// b) parse into our internal representation
	const parsed = parseMap[fnName](inputCss as string)

	// c) convert between color‑spaces
	const fromSpace = cssToSpace[parsed.space]
	const toSpace = cssToSpace[to]
	const converted = convertWeb(fromSpace, toSpace, parsed.data)

	// d) serialize back to a *branded* CSS string
	return serializeMap[to](converted)
}

// src/example.ts
// import { convertCss } from "./dynamic/css"

const out = convertCss("#f09", "hsl")
// ↳ internally: #f09 → parseHex → sRGB
//               convert("sRGB","HSL",…) using webGraph
//               serializeHsl gives CSS text
console.log(out) // e.g. "hsl(324deg 100% 50%)"
