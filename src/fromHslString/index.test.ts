import test, { ExecutionContext } from "ava"

import { Color, HslString } from "../types"
import fromHslString from "."
import { assertColor } from "../_test-utils"

function assertFromHslString(
	t: ExecutionContext,
	input: HslString,
	expected: Color,
) {
	return assertColor(t, fromHslString(input), expected)
}

test(
	"converts an hsl() string function to a Color",
	assertFromHslString,
	"hsl(210, 50%, 40%)",
	[0.2, 0.4, 0.6, 1],
)

test(
	"converts an hsla() string function to a Color",
	assertFromHslString,
	"hsl(210, 50%, 40%, 0.8)",
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows arbitrary precision in input string",
	assertFromHslString,
	"hsl(293.37705189960576, 75.08409229087809%, 49.54938445%, .707106781)",
	[0.785398163, 0.123456789, 0.8675309, 0.707106781],
)

test(
	"allows out of gamut values in input string",
	assertFromHslString,
	"hsl(570, -50%, -40%, 2)",
	[-0.6, -0.4, -0.2, 2],
)

test(
	"allows exponential numbers in input string",
	assertFromHslString,
	"hsl(21e1, .5e2%, 400E-1%, 0.8e0)",
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows additional whitespace in input string",
	assertFromHslString,
	`
		hsl(
			210,
			50%,
			40%
		)
	`,
	[0.2, 0.4, 0.6, 1],
)

test("throws RangeError when the input uses units", (t) => {
	t.throws(() => fromHslString("hsl(210deg, 50%, 40%)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input uses space delimiters", (t) => {
	t.throws(() => fromHslString("hsl( 210 50% 40% / 0.8)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the function is incorrect", (t) => {
	t.throws(() => fromHslString("rgb(210, 50%, 40%, 0.8)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input hue is malformed", (t) => {
	t.throws(() => fromHslString("hsl(+-210, 50%, 40%)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input saturation is malformed", (t) => {
	t.throws(() => fromHslString("hsl(210, +-50%, 40%)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input lightness is malformed", (t) => {
	t.throws(() => fromHslString("hsl(210, 50%, +-40%)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input alpha is malformed", (t) => {
	t.throws(() => fromHslString("hsl(210, 50%, 40%, +-0.5)"), {
		instanceOf: RangeError,
	})
})
