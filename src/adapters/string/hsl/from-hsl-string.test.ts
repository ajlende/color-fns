import test from "ava"

import type { HSL } from "../../../core/spaces.js"
import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import { fromHslString } from "./from-hsl-string.js"

const assertFromHslString = execEqualsValue(fromHslString)
const assertRangeError = execRangeError(fromHslString)

test(
	"converts an hsl() string function to a Color", //
	assertFromHslString,
	"hsl(210, 50%, 40%)",
	{ h: 210, s: 50, l: 40 } as HSL,
)

test(
	"converts an hsla() string function to a Color", //
	assertFromHslString,
	"hsl(210, 50%, 40%, 0.8)",
	{ h: 210, s: 50, l: 40, alpha: 0.8 } as HSL,
)

test(
	"allows arbitrary precision in input string", //
	assertFromHslString,
	"hsl(293.37705189960576, 75.08409229087809%, 49.54938445%, .707106781)",
	{
		h: 293.37705189960576,
		s: 75.08409229087809,
		l: 49.54938445,
		alpha: 0.707106781,
	} as HSL,
)

test(
	"allows out of gamut values in input string", //
	assertFromHslString,
	"hsl(570, -50%, -40%, 2)",
	{ h: 570, s: -50, l: -40, alpha: 2 } as HSL,
)

test(
	"allows exponential numbers in input string", //
	assertFromHslString,
	"hsl(21e1, .5e2%, 400E-1%, 0.8e0)",
	{ h: 21e1, s: 0.5e2, l: 400e-1, alpha: 0.8 } as HSL,
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
	{ h: 210, s: 50, l: 40 } as HSL,
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
