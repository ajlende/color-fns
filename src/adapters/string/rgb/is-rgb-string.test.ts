import test from "ava"

import { execValidValue, execInvalidValue } from "../../../_test-utils.js"

import { isRgbString } from "./is-rgb-string.js"

const assertIsRgbString = execValidValue(isRgbString)
const assertIsNotRgbString = execInvalidValue(isRgbString)

test(
	"returns true when the input is a simple RGB string", //
	assertIsRgbString,
	"rgb(127, 255, 0)",
)

test(
	"returns true when the input has an alpha value", //
	assertIsRgbString,
	"rgb(127, 255, 0, 0.5)",
)

test(
	"returns true when input values are floating point", //
	assertIsRgbString,
	"rgb(127.0125, .5, 12)",
)

test(
	"returns true when input values are exponential", //
	assertIsRgbString,
	"rgb(127e-2, 1e2, 2E-1)",
)

test(
	"returns true when input values are spaced differently", //
	assertIsRgbString,
	"rgb(	127.0125,	0.5,	0	)",
)

test(
	"returns true when input values have newlines between them", //
	assertIsRgbString,
	`
rgb(
	127.0125,
	0.5,
	0
)
`,
)

test(
	"returns true even when input values are out of gamut", //
	assertIsRgbString,
	"rgb(511, -.5, 0)",
)

test(
	"returns false when the input uses percentages", //
	assertIsNotRgbString,
	"rgb(50%, 25%, 0%)",
)

test(
	"returns false when the input uses space delimiters", //
	assertIsNotRgbString,
	"rgb( 127 255 0 )",
)
