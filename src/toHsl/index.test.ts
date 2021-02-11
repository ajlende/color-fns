import test, { ExecutionContext } from "ava"

import { Color, Hsl } from "../types"
import { assertHsl } from "../_test-utils"

import toHsl from "."

function assertToHsl(t: ExecutionContext, input: Color, expected: Hsl) {
	const actual = toHsl(input)
	t.log(actual)
	assertHsl(t, actual, expected)
}

test(
	"converts from a Color array to an Hsl object",
	assertToHsl,
	[0.2, 0.4, 0.6, 0.8],
	{ h: 210, s: 0.5, l: 0.4, a: 0.8 },
)

test(
	"converts when red is the lightest color",
	assertToHsl,
	[1.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 1, l: 0.5, a: 1 },
)

test(
	"converts when green is the lightest color",
	assertToHsl,
	[0.0, 1.0, 0.0, 1.0],
	{ h: 120, s: 1, l: 0.5, a: 1 },
)

test(
	"converts when blue is the lightest color",
	assertToHsl,
	[0.0, 0.0, 1.0, 1.0],
	{ h: 240, s: 1, l: 0.5, a: 1 },
)

test(
	"converts when red is the lightest color and green is less than blue",
	assertToHsl,
	[1.0, 0.8, 0.9, 1.0],
	{ h: 330, s: 1, l: 0.9, a: 1 },
)

test(
	"converts when the color is a shade of gray",
	assertToHsl,
	[0.5, 0.5, 0.5, 1.0],
	{ h: 0, s: 0, l: 0.5, a: 1 },
)

test(
	"converts when the color is pure white",
	assertToHsl,
	[1.0, 1.0, 1.0, 1.0],
	{ h: 0, s: 0, l: 1, a: 1 },
)

test(
	"converts when the color is pure black",
	assertToHsl,
	[0.0, 0.0, 0.0, 1.0],
	{ h: 0, s: 0, l: 0, a: 1 },
)

test(
	"allows colors that are out of gamut",
	assertToHsl,
	[-0.2, -0.4, -0.6, -0.8],
	{ h: 30, s: -0.5, l: -0.4, a: -0.8 },
)
