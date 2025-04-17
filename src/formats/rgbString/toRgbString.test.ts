import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import toRgbString from "./toRgbString.js"

const assertToRgbString = execEqualsValue(toRgbString)

test(
	"returns an RgbString omitting the alpha value of one", //
	assertToRgbString,
	[0.2, 0.4, 0.6, 1],
	"rgb(51, 102, 153)",
)

test(
	"returns an RgbString with the alpha less than one", //
	assertToRgbString,
	[0.2, 0.4, 0.6, 0.8],
	"rgba(51, 102, 153, 0.8)",
)

test(
	"out of range values are maintained", //
	assertToRgbString,
	[2, 4, 6, 1],
	"rgb(510, 1020, 1530)",
)
