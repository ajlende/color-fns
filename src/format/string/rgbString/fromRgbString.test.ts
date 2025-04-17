import test from "ava"

import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import fromRgbString from "./fromRgbString.js"

const assertFromRgbString = execEqualsValue(fromRgbString)
const assertRangeError = execRangeError(fromRgbString)
test(
	"parses an rgb() string", //
	assertFromRgbString,
	"rgb(51, 102, 153)",
	[0.2, 0.4, 0.6, 1],
)

test(
	"parses an rgba() string", //
	assertFromRgbString,
	"rgb(51, 102, 153, 0.8)",
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows arbitrary precision", //
	assertFromRgbString,
	"rgb(63.75,102,153,.5)",
	[0.25, 0.4, 0.6, 0.5],
)

test(
	"allows out of gamut", //
	assertFromRgbString,
	"rgb(510, -0, -153, 2)",
	[2, -0, -0.6, 2],
)

test(
	"allows exponential numbers", //
	assertFromRgbString,
	"rgb(5100e-2, 1.02e2, 1530E-1, .8e0)",
	[0.2, 0.4, 0.6, 0.8],
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
	[0.2, 0.4, 0.6, 1],
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
