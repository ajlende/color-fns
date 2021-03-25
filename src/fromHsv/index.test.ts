import test, { ExecutionContext } from "ava"

import { Color, Hsv } from "../types"
import { assertColor } from "../_test-utils"

import fromHsv from "."

function assertFromHsv(t: ExecutionContext, input: Hsv, expected: Color) {
	assertColor(t, fromHsv(input), expected)
}

test(
	"converts from an HSL object to Color array",
	assertFromHsv,
	{ h: 210, s: 0.6666666667, v: 0.6, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows hues outside of the half-open range [0,360)",
	assertFromHsv,
	{ h: 570, s: 0.6666666667, v: 0.6, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"converts when red is the lightest color",
	assertFromHsv,
	{ h: 0, s: 1, v: 1, a: 1 },
	[1.0, 0.0, 0.0, 1.0],
)

test(
	"converts when green is the lightest color",
	assertFromHsv,
	{ h: 120, s: 1, v: 1, a: 1 },
	[0.0, 1.0, 0.0, 1.0],
)

test(
	"converts when blue is the lightest color",
	assertFromHsv,
	{ h: 240, s: 1, v: 1, a: 1 },
	[0.0, 0.0, 1.0, 1.0],
)

test(
	"allows out of gamut values",
	assertFromHsv,
	{ h: -330, s: -2, v: -0.2, a: -0.8 },
	[-0.2, -0.4, -0.6, -0.8],
)
