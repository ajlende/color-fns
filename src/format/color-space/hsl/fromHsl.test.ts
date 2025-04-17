import test from "ava"

import { execEqualsValue } from "../../../_test-utils.js"

import fromHsl from "./fromHsl.js"

const assertFromHsl = execEqualsValue(fromHsl)

test(
	"Hsl object with alpha", //
	assertFromHsl,
	{ h: 210, s: 0.5, l: 0.4, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"Hsl object with >50% brightness", //
	assertFromHsl,
	{ h: 210, s: 0.5, l: 0.6, a: 1 },
	[0.4, 0.6, 0.8, 1],
)

test(
	"Hues outside of [0,360) are allowed", //
	assertFromHsl,
	{ h: 570, s: 0.5, l: 0.4, a: 0.8 },
	[0.2, 0.4, 0.6, 0.8],
)

test(
	"Out of gamut values are allowed", //
	assertFromHsl,
	{ h: -330, s: -0.5, l: -0.4, a: -0.8 },
	[-0.2, -0.4, -0.6, -0.8],
)
