import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import fromRgb from "./fromRgb.js"

const assertRgb = execEqualsValue(fromRgb)

test(
	"Rgb object with alpha", //
	assertRgb,
	{ r: 51, g: 102, b: 153, a: 1 },
	[0.2, 0.4, 0.6, 1],
)
