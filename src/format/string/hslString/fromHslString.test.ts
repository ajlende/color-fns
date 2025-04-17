import test from "ava"

import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import fromHslString from "./fromHslString.js"

const assertFromHslString = execEqualsValue(fromHslString)
const assertRangeError = execRangeError(fromHslString)

test(
	"converts an hsl() string function to a Color", //
	assertFromHslString,
	"hsl(210, 50%, 40%)",
	[0.2, 0.4, 0.6, 1],
)

test(
	"converts an hsla() string function to a Color", //
	assertFromHslString,
	"hsl(210, 50%, 40%, 0.8)",
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows arbitrary precision in input string", //
	assertFromHslString,
	"hsl(293.37705189960576, 75.08409229087809%, 49.54938445%, .707106781)",
	[0.785398163, 0.123456789, 0.8675309, 0.707106781],
)

test(
	"allows out of gamut values in input string", //
	assertFromHslString,
	"hsl(570, -50%, -40%, 2)",
	[-0.6, -0.4, -0.2, 2],
)

test(
	"allows exponential numbers in input string", //
	assertFromHslString,
	"hsl(21e1, .5e2%, 400E-1%, 0.8e0)",
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows additional whitespace in input string", //
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

test(
	"throws RangeError when the input uses units", //
	assertRangeError,
	"hsl(210deg, 50%, 40%)",
)

test(
	"throws RangeError when the input uses space delimiters", //
	assertRangeError,
	"hsl( 210 50% 40% / 0.8)",
)

test(
	"throws RangeError when the function is incorrect", //
	assertRangeError,
	"rgb(210, 50%, 40%, 0.8)",
)

test(
	"throws RangeError when the input hue is malformed", //
	assertRangeError,
	"hsl(+-210, 50%, 40%)",
)

test(
	"throws RangeError when the input saturation is malformed", //
	assertRangeError,
	"hsl(210, +-50%, 40%)",
)

test(
	"throws RangeError when the input lightness is malformed", //
	assertRangeError,
	"hsl(210, 50%, +-40%)",
)

test(
	"throws RangeError when the input alpha is malformed", //
	assertRangeError,
	"hsl(210, 50%, 40%, +-0.5)",
)
