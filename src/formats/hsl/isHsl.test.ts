import test from "ava"

import { execInvalidValue, execValidValue } from "../../_test-utils.js"

import isHsl from "./isHsl.js"

const assertHslValid = execValidValue(isHsl)
const assertHslInvalid = execInvalidValue(isHsl)

test(
	"Valid Hsl object", //
	assertHslValid,
	{ h: 0, s: 0.5, l: 0.5, a: 1 },
)

test(
	"Hue is required on Hsl object", //
	assertHslInvalid,
	{ s: 0.5, l: 0.5, a: 1 },
)

test(
	"Saturation is required on Hsl object", //
	assertHslInvalid,
	{ h: 0, l: 0.5, a: 1 },
)

test(
	"Lightness is required on Hsl object", //
	assertHslInvalid,
	{ h: 0, s: 0.5, a: 1 },
)

test(
	"Alpha is required on Hsl object", //
	assertHslInvalid,
	{ h: 0, s: 0.5, l: 0.5 },
)

test(
	"Hsl object must not have non-numeric values", //
	assertHslInvalid,
	{ h: 0, s: 0.1, l: 0.3, a: "1" },
)

test(
	"Hsl object must not be null", //
	assertHslInvalid,
	null,
)
