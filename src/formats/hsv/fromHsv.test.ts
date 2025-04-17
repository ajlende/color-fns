import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import fromHsv from "./fromHsv.js"

const assertFromHsv = execEqualsValue(fromHsv)

test(
	"HSL object to Color array", //
	assertFromHsv,
	{ h: 210, s: 0.6666666667, v: 0.6, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"Hues outside of the half-open range [0,360) are wrapped", //
	assertFromHsv,
	{ h: 570, s: 0.6666666667, v: 0.6, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"0deg hue is red", //
	assertFromHsv,
	{ h: 0, s: 1, v: 1, a: 1 },
	[1.0, 0.0, 0.0, 1.0],
)

test(
	"120deg hue is green", //
	assertFromHsv,
	{ h: 120, s: 1, v: 1, a: 1 },
	[0.0, 1.0, 0.0, 1.0],
)

test(
	"240deg hue is blue", //
	assertFromHsv,
	{ h: 240, s: 1, v: 1, a: 1 },
	[0.0, 0.0, 1.0, 1.0],
)

test(
	"Out of gamut values are allowed", //
	assertFromHsv,
	{ h: -330, s: -2, v: -0.2, a: -0.8 },
	[-0.2, -0.4, -0.6, -0.8],
)
