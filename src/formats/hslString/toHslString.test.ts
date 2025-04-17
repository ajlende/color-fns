import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import toHslString from "./toHslString.js"

const assertToHslString = execEqualsValue(toHslString)

// TODO: Not sure how to test the rounding errors that happen during serialization.

test(
	"returns an HslString omitting the alpha value of one", //
	assertToHslString,
	[0.2, 0.4, 0.6, 1],
	"hsl(210, 49.99999999999999%, 40%)",
)

test(
	"returns an HslString with the alpha less than one", //
	assertToHslString,
	[0.2, 0.4, 0.6, 0.8],
	"hsla(210, 49.99999999999999%, 40%, 0.8)",
)

test(
	"out of range values are maintained", //
	assertToHslString,
	[2, 4, 6, 1],
	"hsl(210, -66.66666666666666%, 400%)",
)
