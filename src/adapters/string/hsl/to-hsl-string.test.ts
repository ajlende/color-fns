import test from "ava"

import type { HSL } from "../../../core/spaces.js"
import { execEqualsValue } from "../../../_test-utils.js"

import { toHslString } from "./to-hsl-string.js"

const assertToHslString = execEqualsValue(toHslString)

// TODO: Not sure how to test the rounding errors that happen during serialization.

test(
	"returns an HslString omitting the alpha value of one", //
	assertToHslString,
	{ h: 210, s: 50, l: 40 } as HSL,
	"hsl(210, 50%, 40%)",
)

test(
	"returns an HslString with the alpha less than one", //
	assertToHslString,
	{ h: 210, s: 50, l: 40, alpha: 0.8 } as HSL,
	"hsla(210, 50%, 40%, 0.8)",
)

test(
	"out of range values are maintained", //
	assertToHslString,
	{ h: 210, s: -50, l: 400, alpha: 1 } as HSL,
	"hsl(210, -50%, 400%)",
)
