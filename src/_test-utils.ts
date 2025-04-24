// eslint-disable-next-line ava/use-test
import { ImplementationFn } from "ava"

/**
 * Tolerance for floating point assertions. Most values are within the range
 * [0,1] and we want to keep reasonable values when reversing a computation.
 */
export const TOLERANCE: number = Math.pow(2, -32)

/**
 * Check if an object is indexable
 *
 * @param obj Object to check
 *
 * @returns Whether the object is indexable
 */
function isIndexableObject(obj: unknown): obj is Record<string, unknown> {
	return typeof obj === "object" && obj !== null
}

/**
 * Replace values within a tolerance with the expected value for comparison
 * with `t.deepEqual()`.
 *
 * @param actual Actual computed value
 * @param expected Expected result
 *
 * @returns Filtered value
 */
function withTolerance(actual: unknown, expected: unknown): unknown {
	if (Array.isArray(actual) && Array.isArray(expected)) {
		return actual.map((value, index) => withTolerance(value, expected[index]))
	}
	if (isIndexableObject(actual) && isIndexableObject(expected)) {
		const result: Record<string, unknown> = {}
		for (const key in actual) {
			result[key] = withTolerance(actual[key], expected[key])
		}
		return result
	}
	if (typeof actual === "number" && typeof expected === "number") {
		return Math.abs(expected - actual) < TOLERANCE ? expected : actual
	}
	return actual
}

/**
 * Create a test that asserts that the result is valid
 *
 * @param detect Function that returns a boolean
 *
 * @returns Implementation function
 */
export function execValidValue<Value>(
	detect: (value: unknown) => value is Value,
): ImplementationFn<[Value]> {
	return function (t, value: Value) {
		t.true(detect(value))
	}
}

/**
 * Create a test that asserts that the result is invalid
 *
 * @param detect Function that returns a boolean
 *
 * @returns Implementation function
 */
export function execInvalidValue(
	detect: (value: unknown) => value is unknown,
): ImplementationFn<[unknown]> {
	return function (t, value: unknown) {
		t.false(detect(value))
	}
}

/**
 * Create a test that asserts that the result is equal to the expected value
 *
 * @param convert Function that converts a value to an expected result
 *
 * @returns Implementation function
 */
export function execEqualsValue<Value, Expected>(
	convert: (value: Value) => Expected,
): ImplementationFn<[Value, Expected]> {
	return function (t, value: Value, expected: Expected) {
		t.deepEqual(
			withTolerance(convert(value), expected),
			expected,
			`["${value}", [${expected}]]`,
		)
	}
}

/**
 * Create a test that asserts that the result is a RangeError
 *
 * @param fn Function that throws a RangeError
 *
 * @returns Implementation function
 */
export function execRangeError<Value>(
	fn: (value: Value) => unknown,
): ImplementationFn<[Value]> {
	return function (t, value: Value) {
		t.throws(() => fn(value), { instanceOf: RangeError })
	}
}
