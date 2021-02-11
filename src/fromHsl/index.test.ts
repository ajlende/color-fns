import test, { ExecutionContext } from "ava"

import { Color, Hsl } from "../types"
import { assertColor } from "../_test-utils"

import fromHsl from "."

function assertFromHsl(t: ExecutionContext, input: Hsl, expected: Color) {
	assertColor(t, fromHsl(input), expected)
}

test(
	"converts from an HSL object to Color array",
	assertFromHsl,
	{ h: 210, s: 0.5, l: 0.4, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"converts from an HSL object to Color array with greater than 50% brightness",
	assertFromHsl,
	{ h: 210, s: 0.5, l: 0.6, a: 1 },
	[0.4, 0.6, 0.8, 1],
)

test(
	"allows hues outside of the half-open range [0,360)",
	assertFromHsl,
	{ h: 570, s: 0.5, l: 0.4, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"allows out of gamut values",
	assertFromHsl,
	{ h: -330, s: -0.5, l: -0.4, a: -0.8 },
	[-0.2, -0.4, -0.6, -0.8],
)
