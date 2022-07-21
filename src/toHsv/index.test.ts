import test, { ExecutionContext } from "ava"

import { Color, Hsv } from "../types"
import { assertHsv } from "../_test-utils"

import toHsl from "."

function assertToHsv(t: ExecutionContext, input: Color, expected: Hsv) {
	const actual = toHsl(input)
	assertHsv(t, actual, expected)
}

test(
	"converts from a Color array to an Hsl object",
	assertToHsv,
	[0.2, 0.4, 0.6, 0.8],
	{ h: 210, s: 0.6666666667, v: 0.6, a: 0.8 },
)

test(
	"converts when red is the lightest color",
	assertToHsv,
	[1.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 1, v: 1, a: 1 },
)

test(
	"converts when green is the lightest color",
	assertToHsv,
	[0.0, 1.0, 0.0, 1.0],
	{ h: 120, s: 1, v: 1, a: 1 },
)

test(
	"converts when blue is the lightest color",
	assertToHsv,
	[0.0, 0.0, 1.0, 1.0],
	{ h: 240, s: 1, v: 1, a: 1 },
)

test(
	"converts when red is the lightest color and green is less than blue",
	assertToHsv,
	[1.0, 0.8, 0.9, 1.0],
	{ h: 330, s: 0.2, v: 1, a: 1 },
)

test(
	"converts when the color is a shade of gray",
	assertToHsv,
	[0.5, 0.5, 0.5, 1.0],
	{ h: 0, s: 0, v: 0.5, a: 1 },
)

test(
	"converts when the color is pure white",
	assertToHsv,
	[1.0, 1.0, 1.0, 1.0],
	{ h: 0, s: 0, v: 1, a: 1 },
)

test(
	"converts when the color is pure black",
	assertToHsv,
	[0.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 0, v: 0, a: 1 },
)

test(
	"allows colors that are out of gamut",
	assertToHsv,
	[-0.2, -0.4, -0.6, -0.8],
	{ h: 30, s: -2, v: -0.2, a: -0.8 },
)
