import test from "ava"

import type { sRGB } from "../../../core/spaces.js"
import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import { fromRgbString } from "./from-rgb-string.js"

const assertFromRgbString = execEqualsValue(fromRgbString)
const assertRangeError = execRangeError(fromRgbString)
test(
	"parses an rgb() string", //
	assertFromRgbString,
	"rgb(51, 102, 153)",
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 1 } as sRGB,
)

test(
	"parses an rgba() string", //
	assertFromRgbString,
	"rgb(51, 102, 153, 0.8)",
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 0.8 } as sRGB,
)

test(
	"allows arbitrary precision", //
	assertFromRgbString,
	"rgb(63.75,102,153,.5)",
	{ r: 0.25, g: 0.4, b: 0.6, alpha: 0.5 } as sRGB,
)

test(
	"allows out of gamut", //
	assertFromRgbString,
	"rgb(510, -0, -153, 2)",
	{ r: 2, g: 0, b: -0.6, alpha: 2 } as sRGB,
)

test(
	"allows exponential numbers", //
	assertFromRgbString,
	"rgb(5100e-2, 1.02e2, 1530E-1, .8e0)",
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 0.8 } as sRGB,
)

test(
	"allows additional whitespace", //
	assertFromRgbString,
	`
rgb(
	51,
	102,
	153
)
`,
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 1 } as sRGB,
)

test(
	"throws RangeError when the input uses percentages", //
	assertRangeError,
	"rgb(50%, 25%, 0%)",
)

test(
	"throws RangeError when the input uses space delimiters", //
	assertRangeError,
	"rgb( 51 102 153 / 0.8)",
)

test(
	"throws RangeError when the function is incorrect", //
	assertRangeError,
	"hsl(210, 40%, 50%, 0.5)",
)

test(
	"throws RangeError when the input color is malformed", //
	assertRangeError,
	"rgb(+-51, 102, 153)",
)
