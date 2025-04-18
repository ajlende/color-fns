import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import fromLrgb from "./fromLrgb.js"

const assertLrgb = execEqualsValue(fromLrgb)

test(
	"Lrgb object with alpha", //
	assertLrgb,
	{ r: 0.2, g: 0.4, b: 0.6, a: 1 },
	[0.2, 0.4, 0.6, 1],
)

test(
	"Lrgb object with zero alpha", //
	assertLrgb,
	{ r: 0.2, g: 0.4, b: 0.6, a: 0 },
	[0.2, 0.4, 0.6, 0],
)

test(
	"Lrgb object with partial alpha", //
	assertLrgb,
	{ r: 0.2, g: 0.4, b: 0.6, a: 0.5 },
	[0.2, 0.4, 0.6, 0.5],
)
