// eslint-disable-next-line ava/use-test
import { ExecutionContext } from "ava"

import { Color, Hsl } from "./types"

/**
 * Tolerance for floating point assertions. Most values are within the range
 * [0,1] and we want to keep reasonable values when reversing a computation.
 */
export const TOLERANCE = Math.pow(2, -32)

/**
 * Assert that `actual` is the same Color as `expected`
 *
 * @param t AVA execution context
 * @param actual Actual computed value
 * @param expected Expected result
 */
export function assertColor(
	t: ExecutionContext,
	actual: Color,
	expected: Color,
): void {
	const diff = {
		red: expected[0] - actual[0],
		green: expected[1] - actual[1],
		blue: expected[2] - actual[2],
		alpha: expected[3] - actual[3],
	}
	const closeEnough = Object.values(diff).every(
		(d) => Math.abs(d) < TOLERANCE,
	)
	t.true(closeEnough, `Values are off by: ${JSON.stringify(diff, null, 2)}.`)
}

/**
 * Assert that `actual` is the same Hsl object as `expected`
 *
 * @param t AVA execution context
 * @param actual Actual computed value
 * @param expected Expected result
 */
export function assertHsl(
	t: ExecutionContext,
	actual: Hsl,
	expected: Hsl,
): void {
	const diff = {
		hue: expected.h - actual.h,
		saturation: expected.s - actual.s,
		lightness: expected.l - actual.l,
		alpha: expected.a - actual.a,
	}
	const closeEnough = Object.values(diff).every(
		(d) => Math.abs(d) < TOLERANCE,
	)
	t.true(closeEnough, `Values are off by: ${JSON.stringify(diff, null, 2)}.`)
}
