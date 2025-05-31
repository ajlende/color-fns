I'm working on a TypeScript library for color management.

It has some overarching goals:

-  Accurate: We do the color science so you don't have to.
-  Functional & Pure: Simple, testable, and composable.
-  TypeScript: Provides helpful hints for both humans and AI assistants.
-  Code Quality: No explicit `any` types.

And it serves two different user personas with their own concerns.

1.  The Expert
    -  Dead-code elimination works perfectly—only the functions needed end up in the bundle.
    -  Full end-to-end type safety.
    -  API can be extended with custom color spaces or very specific requirements.
    -  Complicated types are okay as long as they're correct.
    -  Strict static-only pipe api
       ```ts
       pipe(srgbToHsv, hsvToHwb)({ r:0, g:0, b:0 } as sRGB)
       // const pipe: <sRGB, HSV, HWB>(fn1: Converter<sRGB, HSV>, fn2: Converter<HSV, HWB>): Converter<sRGB, HWB>
       ```
2.  The Hobbyist
    -  Ships features for their web apps as fast as possible.
    -  Work with colors without thinking about the type system.
    -  Needs best-in-class autocomplete and readable tooltips.
    -  One-stop dynamic dispatcher
       ```ts
       convert('sRGB', 'HWB', { r:0, g:0, b:0 })
       // const convert: <"sRGB", "HWB">(from: "sRGB", to: "HWB", input: sRGB) => HWB
       ```

This is what I've come up with so far.

```ts
// -------------------
// Color Spaces
// -------------------

export type ColorSpace<K extends string, T> = T & { readonly __space: K }
export type UnknownColorSpace = ColorSpace<string, unknown>

export type ColorSpaceKey<S extends UnknownColorSpace> = S["__space"]
export type ColorSpaceData<S extends UnknownColorSpace> = Omit<S, "__space">

export type RefRange<U extends number, V extends number> = number & {
	readonly __range?: [min: U, max: V]
}
export type RefAngle<U extends number, V extends number> = RefRange<U, V> & {
	readonly __angle?: true
}

export type sRGB_Linear = ColorSpace<"sRGB_Linear", { r: RefRange<0, 1> g: RefRange<0, 1> b: RefRange<0, 1> }>
export type sRGB = ColorSpace<"sRGB", { r: RefRange<0, 255> g: RefRange<0, 255> b: RefRange<0, 255> }>
export type HSL = ColorSpace<"HSL", { h: RefAngle<0, 360> s: RefRange<0, 100> l: RefRange<0, 100> }>
export type HSV = ColorSpace<"HSV", { h: RefAngle<0, 360> s: RefRange<0, 100> v: RefRange<0, 100> }>
export type HWB = ColorSpace<"HWB", { h: RefAngle<0, 360> w: RefRange<0, 100> b: RefRange<0, 100> }>
export type XYZ_D65 = ColorSpace<"XYZ_D65", { x: RefRange<0, 1> y: RefRange<0, 1> z: RefRange<0, 1> }>
export type XYZ_D50 = ColorSpace<"XYZ_D50", { x: RefRange<0, 1> y: RefRange<0, 1> z: RefRange<0, 1> }>
export type JzCzHz = ColorSpace<"JzCzHz", { jz: RefRange<0, 1> cz: RefRange<0, 0.26> hz: RefAngle<0, 360> }>
export type Jzazbz = ColorSpace<"Jzazbz", { jz: RefRange<0, 1> az: RefRange<-0.21, 0.21> bz: RefRange<-0.21, 0.21> }>
export type Lab_D50 = ColorSpace<"Lab_D50", { l: RefRange<0, 100> a: RefRange<-125, 125> b: RefRange<-125, 125> }>
export type LCH = ColorSpace<"LCH", { l: RefRange<0, 100> c: RefRange<0, 150> h: RefAngle<0, 360> }>
export type ProPhoto = ColorSpace<"ProPhoto", { r: RefRange<0, 1> g: RefRange<0, 1> b: RefRange<0, 1> }>
export type ProPhoto_Linear = ColorSpace<"ProPhoto_Linear", { r: RefRange<0, 1> g: RefRange<0, 1> b: RefRange<0, 1> }>

export type AnyColorSpace =
	| sRGB_Linear
	| sRGB
	| HSL
	| HSV
	| HWB
	| XYZ_D65
	| XYZ_D50
	| Jzazbz
	| JzCzHz
	| Lab_D50
	| LCH
	| ProPhoto_Linear
	| ProPhoto

// ----------
// Static API
// ----------

export interface Converter<
	F extends UnknownColorSpace,
	T extends UnknownColorSpace,
> {
	(input: F): T
	(input: ColorSpaceData<F>): T
}

export type UnknownConverter = Converter<UnknownColorSpace, UnknownColorSpace>

// Implementations are stubbed for brevity
export const linearSrgbToXyzD65: Converter<sRGB_Linear, XYZ_D65> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D65
export const xyzD65ToLinearSrgb: Converter<XYZ_D65, sRGB_Linear> = (_input) => ({ r: 0, g: 0, b: 0 }) as sRGB_Linear

export const linearSrgbToSrgb: Converter<sRGB_Linear, sRGB> = (_input) => ({ r: 0, g: 0, b: 0 }) as sRGB
export const srgbToLinear: Converter<sRGB, sRGB_Linear> = (_input) => ({ r: 0, g: 0, b: 0 }) as sRGB_Linear

export const srgbToHsl: Converter<sRGB, HSL> = (_input) => ({ h: 0, s: 0, l: 0 }) as HSL
export const hslToSrgb: Converter<HSL, sRGB> = (_input) => ({ r: 0, g: 0, b: 0 }) as sRGB

export const srgbToHsv: Converter<sRGB, HSV> = (_input) => ({ h: 0, s: 0, v: 0 }) as HSV
export const hsvToSrgb: Converter<HSV, sRGB> = (_input) => ({ r: 0, g: 0, b: 0 }) as sRGB

export const hsvToHwb: Converter<HSV, HWB> = (_input) => ({ h: 0, w: 0, b: 0 }) as HWB
export const hwbToHsv: Converter<HWB, HSV> = (_input) => ({ h: 0, s: 0, v: 0 }) as HSV

export const xyzD65ToXyzD50: Converter<XYZ_D65, XYZ_D50> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D50
export const xyzD50ToXyzD65: Converter<XYZ_D50, XYZ_D65> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D65

export const xyzD50ToJzazbz: Converter<XYZ_D50, Jzazbz> = (_input) => ({ jz: 0, az: 0, bz: 0 }) as Jzazbz
export const jzazbzToXyzD50: Converter<Jzazbz, XYZ_D50> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D50

export const xyzD50ToLabD50: Converter<XYZ_D50, Lab_D50> = (_input) => ({ l: 0, a: 0, b: 0 }) as Lab_D50
export const labD50ToXyzD50: Converter<Lab_D50, XYZ_D50> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D50

export const xyzD50ToLinearProPhoto: Converter<XYZ_D50, ProPhoto_Linear> = (_input) => ({ r: 0, g: 0, b: 0 }) as ProPhoto_Linear
export const linearProPhotoToXyzD50: Converter<ProPhoto_Linear, XYZ_D50> = (_input) => ({ x: 0, y: 0, z: 0 }) as XYZ_D50

export const jzazbzToJzCzHz: Converter<Jzazbz, JzCzHz> = (_input) => ({ jz: 0, cz: 0, hz: 0 }) as JzCzHz
export const jzCzHzToJzazbz: Converter<JzCzHz, Jzazbz> = (_input) => ({ jz: 0, az: 0, bz: 0 }) as Jzazbz

export const labD50ToLch: Converter<Lab_D50, LCH> = (_input) => ({ l: 0, c: 0, h: 0 }) as LCH
export const lchToLabD50: Converter<LCH, Lab_D50> = (_input) => ({ l: 0, a: 0, b: 0 }) as Lab_D50

export const linearProPhotoToProPhoto: Converter<ProPhoto_Linear, ProPhoto> = (_input) => ({ r: 0, g: 0, b: 0 }) as ProPhoto
export const proPhotoToLinearProPhoto: Converter<ProPhoto, ProPhoto_Linear> = (_input) => ({ r: 0, g: 0, b: 0 }) as ProPhoto_Linear

export function pipe<
	A extends UnknownColorSpace,
	B extends UnknownColorSpace,
	C extends UnknownColorSpace,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>
): Converter<A, C>
// Additional pipe overloads omitted for brevity
export function pipe(...fns: UnknownConverter[]): UnknownConverter {
	return <F extends UnknownColorSpace, T extends UnknownColorSpace>(
		input: F | ColorSpaceData<F>,
	): T => {
		let acc: unknown = input
		for (const fn of fns) {
			acc = fn(acc as Parameters<typeof fn>[0])
		}
		return acc as T
	}
}

// -----------
// Dynamic API
// -----------

type SpaceOf<
	S extends UnknownColorSpace,
	K extends ColorSpaceKey<S>,
> = Extract<S, ColorSpace<K, unknown>>

type KeyedConverter<
	S extends UnknownColorSpace,
	F extends ColorSpaceKey<S>,
	T extends ColorSpaceKey<S>,
> = Converter<SpaceOf<S, F>, SpaceOf<S, T>>

export type Graph<S extends UnknownColorSpace> = {
	[F in ColorSpaceKey<S>]: {
		[T in ColorSpaceKey<S>]?: KeyedConverter<S, F, T>
	}
}

export interface DynamicConverter<S extends UnknownColorSpace> {
	<F extends ColorSpaceKey<S>, T extends ColorSpaceKey<S>>(
		from: F,
		to: T,
		input: SpaceOf<S, F>,
	): SpaceOf<S, T>
	<F extends ColorSpaceKey<S>, T extends ColorSpaceKey<S>>(
		from: F,
		to: T,
		input: ColorSpaceData<SpaceOf<S, F>>,
	): SpaceOf<S, T>
}

function findPath<S extends UnknownColorSpace>(
	graph: Graph<S>,
	from: ColorSpaceKey<S>,
	to: ColorSpaceKey<S>,
) {
	if (from === to) return [from]

	const queue: ColorSpaceKey<S>[][] = [[from]]
	const visited = new Set<ColorSpaceKey<S>>([from])

	while (queue.length > 0) {
		const path = queue.shift()
		if (!path) continue

		for (const next of Object.keys(
			graph[path[path.length - 1]],
		) as ColorSpaceKey<S>[]) {
			if (visited.has(next)) continue
			visited.add(next)

			const newPath = [...path, next]
			if (next === to) return newPath
			queue.push(newPath)
		}
	}

	throw new Error(`No conversion path found from ${from} to ${to}`)
}

function composeConverters<
	S extends UnknownColorSpace,
	F extends ColorSpaceKey<S>,
	T extends ColorSpaceKey<S>,
>(graph: Graph<S>, path: ColorSpaceKey<S>[]): KeyedConverter<S, F, T> {
	return (input) => {
		let acc: unknown = input
		for (let i = 0; i + 1 < path.length; i++) {
			const f = path[i]
			const t = path[i + 1]
			const converter = graph[f][t]!
			acc = converter(acc as SpaceOf<S, typeof f>)
		}
		return acc as SpaceOf<S, T>
	}
}

export function createConvert<S extends UnknownColorSpace>(
	graph: Graph<S>,
): DynamicConverter<S> {
	const converterCache = new Map<string, unknown>()
	return <F extends ColorSpaceKey<S>, T extends ColorSpaceKey<S>>(
		from: F,
		to: T,
		input: SpaceOf<S, F> | ColorSpaceData<SpaceOf<S, F>>,
	): SpaceOf<S, T> => {
		const cacheKey = `${from}->${to}`
		let fn = converterCache.get(cacheKey) as
			| Converter<SpaceOf<S, F>, SpaceOf<S, T>>
			| undefined
		if (!fn) {
			const path = findPath(graph, from, to)
			fn = composeConverters(graph, path)
			converterCache.set(cacheKey, fn)
		}
		return fn(input)
	}
}

const graph: Graph<AnyColorSpace> = {
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

export const convert = createConvert(graph)
```
