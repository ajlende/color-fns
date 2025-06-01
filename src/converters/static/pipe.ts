import type { ColorData, UnknownColor } from "../../_utils.js"

import type { Converter, UnknownConverter } from "../_utils.js"

/**
 * Pipes a series of color space conversion functions together.
 *
 * @template A - The first input type.
 * @template B - The final output type.
 *
 * @param fn1 - The first function to pipe.
 *
 * @returns A function that converts from the first input type to the final output type.
 *
 * @example
 * ```ts
 * const rgbToHsv = pipe(rgbToHsl, hslToHsv)
 * const hsv = rgbToHsv({ r: 0.5, g: 0.5, b: 0.5 })
 * ```
 *
 * @category Color Space Conversion
 */
// prettier-ignore
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
>(
	fn1: Converter<A, B>,
): Converter<A, B>
// prettier-ignore
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
): Converter<A, C>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
): Converter<A, D>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
): Converter<A, E>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
	F extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
	fn5: Converter<E, F>,
): Converter<A, F>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
	F extends UnknownColor,
	G extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
	fn5: Converter<E, F>,
	fn6: Converter<F, G>,
): Converter<A, G>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
	F extends UnknownColor,
	G extends UnknownColor,
	H extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
	fn5: Converter<E, F>,
	fn6: Converter<F, G>,
	fn7: Converter<G, H>,
): Converter<A, H>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
	F extends UnknownColor,
	G extends UnknownColor,
	H extends UnknownColor,
	I extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
	fn5: Converter<E, F>,
	fn6: Converter<F, G>,
	fn7: Converter<G, H>,
	fn8: Converter<H, I>,
): Converter<A, I>
export function pipe<
	A extends UnknownColor,
	B extends UnknownColor,
	C extends UnknownColor,
	D extends UnknownColor,
	E extends UnknownColor,
	F extends UnknownColor,
	G extends UnknownColor,
	H extends UnknownColor,
	I extends UnknownColor,
>(
	fn1: Converter<A, B>,
	fn2: Converter<B, C>,
	fn3: Converter<C, D>,
	fn4: Converter<D, E>,
	fn5: Converter<E, F>,
	fn6: Converter<F, G>,
	fn7: Converter<G, H>,
	fn8: Converter<H, I>,
): Converter<A, I>
// Hopefully our graph is smaller than d=8. I couldn't get variadic templates to work.
export function pipe(...fns: UnknownConverter[]): UnknownConverter {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	return <F extends UnknownColor, T extends UnknownColor>(
		input: F | ColorData<F>,
	): T => {
		let acc: unknown = input
		for (const fn of fns) {
			acc = fn(acc as Parameters<typeof fn>[0])
		}
		return acc as T
	}
}
