I am working on a TypeScript library for color management.

It has a few overarching goals:

- **TypeScript:** Best in class auto-complete and safety.
- **Documentation:** Useful for both humans and machines.
- **Efficient & Fast:** Bundle the absolute minimum code. Powered by graph theory.
- **Accurate:** Doesn't gloss over color science. Doesn't clamp values.
- **Extensible:** Bring your own custom-tailored functions.
- **Zero Dependencies:** No useless bloat. No additional code to audit.

And it targets two personas with their own concerns:

1. Simplicity and ease of use
   * A "one-stop" dynamic dispatcher
   * Don't care about the implementation details of the library-just pass two keys
   * Support A -> C at runtime, where A and C are distant keys in the graph
   * Care about some dead-code elimination via pre-built graph subsets
2. Strict build requirements and efficiency
   * A "strict" static-only pipe API
   * Dead-code elimination works perfectly—only the functions needed end up in the bundle
   * Full end-to-end type safety

This is what I've come up with so far for the color conversion part. The code will be split up into multiple entry points for better DCE, but I've merged it all into one file for brevity here.

```ts
// -------------------
// Branding
// -------------------

declare const BRAND: unique symbol

type Brand<K extends string, T> = T & { [BRAND]: K }

// -------------------
// Color Spaces
// -------------------

interface ColorDataMap {
	sRGB_Linear: { r: number g: number b: number }
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
	ProPhoto_Linear: { r: number; g: number; b: number }
	ProPhoto: { r: number; g: number; b: number }
}

export type ColorSpaceKey = keyof ColorDataMap
export type ColorSpace<K extends ColorSpaceKey> = Brand<K, ColorDataMap[K]>
export type ColorData<K extends ColorSpaceKey> = ColorDataMap[K]


/**
 * sRGB Linear
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * {@link sRGB}, but with a linear-light transfer function.
 *
 * Related: {@link sRGB}
 */
export type sRGB_Linear = ColorSpace<"sRGB_Linear">

/**
 * sRGB
 *
 * White point: {@link D65}
 *
 * Related: {@link sRGB_Linear}
 */
export type sRGB = Brand<"sRGB", {
	/**
	 * Red
	 *
	 * Range: [0..1]
	 */
	r: number;
	/**
	 * Green
	 *
	 * Range: [0..1]
	 */
	g: number;
	/**
	 * Blue
	 *
	 * Range: [0..1]
	 */
	b: number;
}>

// TODO: Follow the same pattern for documentation
export type HSL = ColorSpace<"HSL">
export type HSV = ColorSpace<"HSV">
export type HWB = ColorSpace<"HWB">
export type XYZ_D65 = ColorSpace<"XYZ_D65">
export type XYZ_D50 = ColorSpace<"XYZ_D50">
export type Jzazbz = ColorSpace<"Jzazbz">
export type JzCzHz = ColorSpace<"JzCzHz">
export type Lab_D50 = ColorSpace<"Lab_D50">
export type LCH = ColorSpace<"LCH">
export type ProPhoto_Linear = ColorSpace<"ProPhoto_Linear">
export type ProPhoto = ColorSpace<"ProPhoto">

export type XYZ = XYZ_D65

export type Converter<F extends ColorSpaceKey, T extends ColorSpaceKey> = (
	input: ColorSpace<F>,
) => ColorSpace<T>

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed converters
const linearSrgbToXyzD65: Converter<"sRGB_Linear", "XYZ_D65"> = (_input) =>
	({ x: 0, y: 0, z: 0 }) as XYZ_D65
const xyzD65ToLinearSrgb: Converter<"XYZ_D65", "sRGB_Linear"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB_Linear

const linearSrgbToSrgb: Converter<"sRGB_Linear", "sRGB"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB
const srgbToLinear: Converter<"sRGB", "sRGB_Linear"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB_Linear

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

const xyzD50ToLinearProPhoto: Converter<"XYZ_D50", "ProPhoto_Linear"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as ProPhoto_Linear
const linearProPhotoToXyzD50: Converter<"ProPhoto_Linear", "XYZ_D50"> = (
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

const linearProPhotoToProPhoto: Converter<"ProPhoto_Linear", "ProPhoto"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as ProPhoto
const proPhotoToLinearProPhoto: Converter<"ProPhoto", "ProPhoto_Linear"> = (
	_input,
) => ({ r: 0, g: 0, b: 0 }) as ProPhoto_Linear
/* eslint-enable @typescript-eslint/no-unused-vars */

export function pipe<K extends ColorSpaceKey, F extends K, T extends K>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...fns: [Converter<F, any>, ...Converter<any, any>[], Converter<any, T>]
) {
	return <K extends ColorSpaceKey, F extends K, T extends K>(
		input: ColorData<F>,
	): ColorSpace<T> => {
		let acc: unknown = input
		for (const fn of fns) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
			acc = fn(acc as any)
		}
		return acc as ColorSpace<T>
	}
}

export type Graph<K extends ColorSpaceKey> = {
	[F in K]: {
		[T in K]?: Converter<F, T>
	}
}

export function findPath<K extends ColorSpaceKey>(
	graph: Graph<K>,
	from: K,
	to: K,
): K[] {
	if (from === to) return [from]

	const queue: K[][] = [[from]]
	const visited = new Set<K>([from])

	while (queue.length > 0) {
		const path = queue.shift()
		if (!path) continue

		for (const next of Object.keys(graph[path[path.length - 1]]) as K[]) {
			if (visited.has(next)) continue
			visited.add(next)

			const newPath = [...path, next]
			if (next === to) return newPath
			queue.push(newPath)
		}
	}

	throw new Error(`No conversion path found from ${from} to ${to}`)
}

export function composeConverters<
	K extends ColorSpaceKey,
	F extends K,
	T extends K,
>(graph: Graph<K>, path: K[]): Converter<F, T> {
	return (input: ColorSpace<F>): ColorSpace<T> => {
		let result: ColorSpace<K> = input
		for (let i = 0; i + 1 < path.length; i++) {
			const a = path[i]
			const b = path[i + 1]
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			result = graph[a][b]!(result)
		}
		return result as ColorSpace<T>
	}
}

export type GraphConvert<K extends ColorSpaceKey> = <F extends K, T extends K>(
	from: F,
	to: T,
	input: ColorData<F>,
) => ColorSpace<T>
function createConvert<K extends ColorSpaceKey>(
	graph: Graph<K>,
): GraphConvert<K> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const converterCache = new Map<string, Converter<any, any>>()
	return <F extends K, T extends K>(from: F, to: T, input: ColorData<F>) => {
		const cacheKey = `${from}->${to}`
		let fn = converterCache.get(cacheKey) as Converter<F, T> | undefined
		if (!fn) {
			const path = findPath(graph, from, to)
			fn = composeConverters<K, F, T>(graph, path)
		}
		return fn(input as ColorSpace<F>)
	}
}

// @lib/colors/dynamic/web
export type WebColorSpaceKey = "sRGB_Linear" | "sRGB" | "HSL" | "HSV" | "HWB"
const webGraph: Graph<WebColorSpaceKey> = {
	sRGB_Linear: {
		sRGB: linearSrgbToSrgb,
	},
	sRGB: {
		sRGB_Linear: srgbToLinear,
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
}
export const convertWeb: GraphConvert<WebColorSpaceKey> =
	createConvert(webGraph)

// @lib/colors/dynamic/d50
export type D50ColorSpaceKey =
	| "XYZ_D50"
	| "Jzazbz"
	| "JzCzHz"
	| "Lab_D50"
	| "LCH"
	| "ProPhoto_Linear"
	| "ProPhoto"
const d50Graph: Graph<D50ColorSpaceKey> = {
	XYZ_D50: {
		Jzazbz: xyzD50ToJzazbz,
		Lab_D50: xyzD50ToLabD50,
		ProPhoto_Linear: xyzD50ToLinearProPhoto,
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
	ProPhoto_Linear: {
		ProPhoto: linearProPhotoToProPhoto,
		XYZ_D50: linearProPhotoToXyzD50,
	},
	ProPhoto: {
		ProPhoto_Linear: proPhotoToLinearProPhoto,
	},
}
export const convertD50: GraphConvert<D50ColorSpaceKey> =
	createConvert(d50Graph)

// @lib/colors/dynamic
const graph: Graph<ColorSpaceKey> = {
	XYZ_D65: {
		XYZ_D50: xyzD65ToXyzD50,
		sRGB_Linear: xyzD65ToLinearSrgb,
	},
	XYZ_D50: {
		XYZ_D65: xyzD50ToXyzD65,
		Jzazbz: xyzD50ToJzazbz,
		Lab_D50: xyzD50ToLabD50,
		ProPhoto_Linear: xyzD50ToLinearProPhoto,
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
	ProPhoto_Linear: {
		ProPhoto: linearProPhotoToProPhoto,
		XYZ_D50: linearProPhotoToXyzD50,
	},
	ProPhoto: {
		ProPhoto_Linear: proPhotoToLinearProPhoto,
	},
	sRGB_Linear: {
		XYZ_D65: linearSrgbToXyzD65,
		sRGB: linearSrgbToSrgb,
	},
	sRGB: {
		sRGB_Linear: srgbToLinear,
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
}
export const convert: GraphConvert<ColorSpaceKey> = createConvert(graph)

// -------------------
// String Formats
// -------------------

interface CssStringMap {
	hex: `#${string}`
	rgb: `rgb(${string})`
	hsl: `hsl(${string})`
	hwb: `hwb(${string})`
}

export type CssStringKey = keyof CssStringMap
export type CssString<K extends CssStringKey> = Brand<K, CssStringMap[K]>

// Convenience types for consumers
export type CssHexString = CssString<"hex">
export type CssRgbString = CssString<"rgb">
export type CssHslString = CssString<"hsl">
export type CssHwbString = CssString<"hwb">

export const cssToSpace = {
	hex: "sRGB",
	rgb: "sRGB",
	hsl: "HSL",
	hwb: "HWB",
} as const
export type CssToSpace = typeof cssToSpace

export type DetectFn<S extends CssStringKey> = (
	input: unknown,
) => input is CssString<S>

// TODO: Implement proper regex detection
export const detectHex: DetectFn<"hex"> = (input): input is CssHexString =>
	typeof input === "string" && input.startsWith("#")
export const detectRgb: DetectFn<"rgb"> = (input): input is CssRgbString =>
	typeof input === "string" && input.startsWith("rgb(")
export const detectHsl: DetectFn<"hsl"> = (input): input is CssHslString =>
	typeof input === "string" && input.startsWith("hsl(")
export const detectHwb: DetectFn<"hwb"> = (input): input is CssHwbString =>
	typeof input === "string" && input.startsWith("hwb(")

export type ParseFn<S extends CssStringKey> = (
	input: string,
) => ColorSpace<CssToSpace[S]>

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed parse functions
export const parseHex: ParseFn<"hex"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB
export const parseRgb: ParseFn<"rgb"> = (_input) =>
	({ r: 0, g: 0, b: 0 }) as sRGB
export const parseHsl: ParseFn<"hsl"> = (_input) =>
	({ h: 0, s: 0, l: 0 }) as HSL
export const parseHwb: ParseFn<"hwb"> = (_input) =>
	({ h: 0, w: 0, b: 0 }) as HWB
/* eslint-enable @typescript-eslint/no-unused-vars */

export type SerializeFn<S extends CssStringKey> = (
	data: ColorSpace<CssToSpace[S]>,
) => CssString<S>

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Implement stubbed serialize functions
export const serializeHex: SerializeFn<"hex"> = (_data) =>
	"#000" as CssHexString
export const serializeRgb: SerializeFn<"rgb"> = (_data) =>
	"rgb(0 0 0)" as CssRgbString
export const serializeHsl: SerializeFn<"hsl"> = (_data) =>
	"hsl(0deg 0% 0%)" as CssHslString
export const serializeHwb: SerializeFn<"hwb"> = (_data) =>
	"hwb(0deg 0% 0%)" as CssHwbString
/* eslint-enable @typescript-eslint/no-unused-vars */

export interface CssDef<S extends CssStringKey> {
	space: CssToSpace[S]
	detect: DetectFn<S>
	parse: ParseFn<S>
	serialize: SerializeFn<S>
}

export const cssDefs: {
	[K in CssStringKey]: CssDef<K>
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

export function convertCss<T extends CssStringKey>(
	inputCss: unknown,
	to: T,
): CssString<T> {
	for (const key of Object.keys(cssDefs) as CssStringKey[]) {
		const def = cssDefs[key]
		if (def.detect(inputCss)) {
			const parsed = def.parse(inputCss)
			const fromSpace = def.space
			const toSpace = cssToSpace[to]
			const converted = convertWeb(fromSpace, toSpace, parsed)
			return cssDefs[to].serialize(converted)
		}
	}
	throw new Error(`Unsupported CSS color format: ${String(inputCss)}`)
}

// -------------------
// Demo
// -------------------

/* eslint-disable no-console */
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
/* eslint-enable no-console */
```

I'm happy with most of it. My goal at this point is to make the docs and types more useful and natural, specifically for LLMs and AI codegen. As you are an LLM, I'd like your opinion. May I ask you some questions?