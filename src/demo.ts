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

// 1) Which CSS functions we support at runtime:
export type CssFunctionName = "hex" | "rgb" | "hsl" | "hwb"

// 2) Map each CSS function to its internal color‐space key
export const cssToSpace = {
	hex: "sRGB",
	rgb: "sRGB",
	hsl: "HSL",
	hwb: "HWB",
} as const
type CssToSpace = typeof cssToSpace

// 3) ParsedCssColor bundles the function name + typed payload
export interface ParsedCssColor<S extends CssFunctionName> {
	space: S
	data: ColorSpaceMap[CssToSpace[S]]
}

// 4) Parser signature
type ParseFn<S extends CssFunctionName> = (input: string) => ParsedCssColor<S>

// 5) Serializers go back to CSS text
type SerializeFn<S extends CssFunctionName> = (
	data: ColorSpaceMap[CssToSpace[S]],
) => string

// 6) Implement stubs for each parser/serializer
const parseHex: ParseFn<"hex"> = (_) => ({
	space: "hex",
	data: { r: 1, g: 0, b: 0.6 }, // stub: #f09 → [1,0,0.6]
})
const parseRgb: ParseFn<"rgb"> = (_) => ({
	space: "rgb",
	data: { r: 0, g: 0, b: 0 },
})
const parseHsl: ParseFn<"hsl"> = (_) => ({
	space: "hsl",
	data: { h: 0, s: 0, l: 0 },
})
const parseHwb: ParseFn<"hwb"> = (_) => ({
	space: "hwb",
	data: { h: 0, w: 0, b: 0 },
})

const serializeHex: SerializeFn<"hex"> = (_) => "#000"
const serializeRgb: SerializeFn<"rgb"> = (_) => "rgb(0 0 0)"
const serializeHsl: SerializeFn<"hsl"> = (_) => "hsl(0deg 0% 0%)"
const serializeHwb: SerializeFn<"hwb"> = (_) => "hwb(0deg 0% 0%)"

// 7) Dispatch tables, each fn lives separately so unused ones DCE away
const parseMap: { [K in CssFunctionName]: ParseFn<K> } = {
	hex: parseHex,
	rgb: parseRgb,
	hsl: parseHsl,
	hwb: parseHwb,
}
const serializeMap: { [K in CssFunctionName]: SerializeFn<K> } = {
	hex: serializeHex,
	rgb: serializeRgb,
	hsl: serializeHsl,
	hwb: serializeHwb,
}

// 8) Tiny fn to detect which CSS function (or hex) was used.
//    Here just a stub; real one would use regexes.
function detectCssFunction(input: string): CssFunctionName {
	if (input.startsWith("#")) return "hex"
	if (input.startsWith("hwb(")) return "hwb"
	if (input.startsWith("hsl(")) return "hsl"
	if (input.startsWith("rgb(")) return "rgb"
	// default
	return "rgb"
}

// 9) The end‑to‑end API
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function convertCss<T extends CssFunctionName>(
	inputCss: string,
	to: T,
): string {
	// parse → { space: 'hex'|'rgb'|…, data: <typed> }
	const fnName = detectCssFunction(inputCss)
	const parsed = parseMap[fnName](inputCss)

	// map CSS fn → internal space keys
	const spaceFrom = cssToSpace[parsed.space]
	const spaceTo = cssToSpace[to]

	// convert payload
	const converted = convertWeb(spaceFrom, spaceTo, parsed.data)

	// serialize back to CSS
	return serializeMap[to](converted)
}

// src/example.ts
// import { convertCss } from "./dynamic/css"

const out = convertCss("#f09", "hsl")
// ↳ internally: #f09 → parseHex → sRGB
//               convert("sRGB","HSL",…) using webGraph
//               serializeHsl gives CSS text
console.log(out) // e.g. "hsl(324deg 100% 50%)"
