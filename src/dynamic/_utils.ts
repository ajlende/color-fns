import {
	ColorSpace,
	ColorSpaceData,
	ColorSpaceKey,
	Converter,
	UnknownColorSpace,
} from "../_utils.js"

// prettier-ignore
type SpaceOf<
	S extends UnknownColorSpace,
	K extends ColorSpaceKey<S>,
> = Extract<S, ColorSpace<K, unknown>>

type KeyedConverter<
	S extends UnknownColorSpace,
	F extends ColorSpaceKey<S>,
	T extends ColorSpaceKey<S>,
> = Converter<SpaceOf<S, F>, SpaceOf<S, T>>

/**
 * A  graph of color space conversions.
 *
 * @template S - The color spaces in the graph.
 *
 * @example
 * ```ts
 * const graph: Graph<sRGB | HSV | HWB> = {
 *   sRGB: {
 *     HSV: srgbToHsv,
 *   },
 *   HSV: {
 *     sRGB: hsvToSrgb,
 *     HWB: hsvToHwb,
 *   },
 *   HWB: {
 *     HSV: hwbToHsv,
 *   },
 * }
 * ```
 */
export type Graph<S extends UnknownColorSpace> = {
	[F in ColorSpaceKey<S>]: {
		[T in ColorSpaceKey<S>]?: KeyedConverter<S, F, T>
	}
}

/**
 * A converter that operates on color space keys.
 *
 * @template S - The color spaces that can be converted.
 *
 * @example
 * ```ts
 * const convert: GraphConverter<sRGB | HSV | HWB> = createConvert(graph)
 * ```
 */
export interface GraphConverter<S extends UnknownColorSpace> {
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
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const converter = graph[f][t]!
			acc = converter(acc as SpaceOf<S, typeof f>)
		}
		return acc as SpaceOf<S, T>
	}
}

/**
 * Creates a converter for a graph of color spaces.
 *
 * @param graph - The graph of color spaces.
 *
 * @returns A converter for the graph.
 */
export function createConvert<S extends UnknownColorSpace>(
	graph: Graph<S>,
): GraphConverter<S> {
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
