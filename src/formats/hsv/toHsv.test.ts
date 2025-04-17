import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import toHsv from "./toHsv.js"

const assertToHsv = execEqualsValue(toHsv)

test(
	"Color array to Hsv object", //
	assertToHsv,
	[0.2, 0.4, 0.6, 0.8],
	{ h: 210, s: 0.6666666667, v: 0.6, a: 0.8 },
)

test(
	"Red is 0deg hue with full saturation and value", //
	assertToHsv,
	[1.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 1, v: 1, a: 1 },
)

test(
	"Green is 120deg hue with full saturation and value", //
	assertToHsv,
	[0.0, 1.0, 0.0, 1.0],
	{ h: 120, s: 1, v: 1, a: 1 },
)

test(
	"Blue is 240deg hue with full saturation and value", //
	assertToHsv,
	[0.0, 0.0, 1.0, 1.0],
	{ h: 240, s: 1, v: 1, a: 1 },
)

test(
	"Red > blue > green", //
	assertToHsv,
	[1.0, 0.8, 0.9, 1.0],
	{ h: 330, s: 0.2, v: 1, a: 1 },
)

test(
	"Gray is 0.5 value", //
	assertToHsv,
	[0.5, 0.5, 0.5, 1.0],
	{ h: 0, s: 0, v: 0.5, a: 1 },
)

test(
	"White is 1.0 value", //
	assertToHsv,
	[1.0, 1.0, 1.0, 1.0],
	{ h: 0, s: 0, v: 1, a: 1 },
)

test(
	"Black is 0.0 value", //
	assertToHsv,
	[0.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 0, v: 0, a: 1 },
)

test(
	"Out of gamut values are allowed", //
	assertToHsv,
	[-0.2, -0.4, -0.6, -0.8],
	{ h: 30, s: -2, v: -0.2, a: -0.8 },
)
