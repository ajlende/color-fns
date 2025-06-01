import type {
	ColorData,
	ColorSpace,
	UnknownColor,
	ColorOf,
} from "../../_utils.js"

import type { Converter } from "../_utils.js"

type SpaceConverter<
	C extends UnknownColor,
	F extends ColorSpace<C>,
	T extends ColorSpace<C>,
> = Converter<ColorOf<C, F>, ColorOf<C, T>>

/**
 * A graph of color space conversions.
 *
 * @template C - The color spaces in the graph.
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
export type ColorSpaceGraph<C extends UnknownColor> = {
	[F in ColorSpace<C>]: {
		[T in ColorSpace<C>]?: SpaceConverter<C, F, T>
	}
}

/**
 * A converter that operates on color space keys.
 *
 * @template C - The color spaces that can be converted.
 *
 * @example
 * ```ts
 * const convert: DynamicConverter<sRGB | HSV | HWB> = createConvert(graph)
 * ```
 */
export interface DynamicConverter<C extends UnknownColor> {
	<F extends ColorSpace<C>, T extends ColorSpace<C>>(
		from: F,
		to: T,
		input: ColorOf<C, F>,
	): ColorOf<C, T>
	<F extends ColorSpace<C>, T extends ColorSpace<C>>(
		from: F,
		to: T,
		input: ColorData<ColorOf<C, F>>,
	): ColorOf<C, T>
}

function findPath<C extends UnknownColor>(
	graph: ColorSpaceGraph<C>,
	from: ColorSpace<C>,
	to: ColorSpace<C>,
) {
	if (from === to) return [from]

	const queue: ColorSpace<C>[][] = [[from]]
	const visited = new Set<ColorSpace<C>>([from])

	while (queue.length > 0) {
		const path = queue.shift()
		if (!path) continue

		for (const next of Object.keys(
			graph[path[path.length - 1]],
		) as ColorSpace<C>[]) {
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
	C extends UnknownColor,
	F extends ColorSpace<C>,
	T extends ColorSpace<C>,
>(graph: ColorSpaceGraph<C>, path: ColorSpace<C>[]): SpaceConverter<C, F, T> {
	return (input) => {
		let acc: unknown = input
		for (let i = 0; i + 1 < path.length; i++) {
			const f = path[i]
			const t = path[i + 1]
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const converter = graph[f][t]!
			acc = converter(acc as ColorOf<C, typeof f>)
		}
		return acc as ColorOf<C, T>
	}
}

/**
 * Creates a converter for a graph of color spaces.
 *
 * @param graph - The graph of color spaces.
 *
 * @returns A converter for the graph.
 */
export function dynamicConverter<C extends UnknownColor>(
	graph: ColorSpaceGraph<C>,
): DynamicConverter<C> {
	const converterCache = new Map<string, unknown>()
	return <F extends ColorSpace<C>, T extends ColorSpace<C>>(
		from: F,
		to: T,
		input: ColorOf<C, F> | ColorData<ColorOf<C, F>>,
	): ColorOf<C, T> => {
		const cacheKey = `${from}->${to}`
		let fn = converterCache.get(cacheKey) as
			| Converter<ColorOf<C, F>, ColorOf<C, T>>
			| undefined
		if (!fn) {
			const path = findPath(graph, from, to)
			fn = composeConverters(graph, path)
			converterCache.set(cacheKey, fn)
		}
		return fn(input)
	}
}
