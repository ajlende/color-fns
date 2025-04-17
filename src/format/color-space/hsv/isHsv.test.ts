import test from "ava"

import { execInvalidValue, execValidValue } from "../../../_test-utils.js"

import isHsv from "./isHsv.js"

const assertValidHsv = execValidValue(isHsv)
const assertInvalidHsv = execInvalidValue(isHsv)

test(
	"Valid Hsv object", //
	assertValidHsv,
	{ h: 210, s: 0.5, v: 0.6, a: 1 },
)

test(
	"String is not a valid Hsv object", //
	assertInvalidHsv,
	"hsv(210, 50%, 60%)",
)
test(
	"Number is not a valid Hsv object", //
	assertInvalidHsv,
	210,
)
test(
	"Null is not a valid Hsv object", //
	assertInvalidHsv,
	null,
)
test(
	"Undefined is not a valid Hsv object", //
	assertInvalidHsv,
	undefined,
)

test(
	"Alpha is required on Hsv object", //
	assertInvalidHsv,
	{ h: 210, s: 0.5, v: 0.6 },
)
test(
	"Value is required on Hsv object", //
	assertInvalidHsv,
	{ h: 210, s: 0.5, a: 1 },
)
test(
	"Saturation is required on Hsv object", //
	assertInvalidHsv,
	{ h: 210, v: 0.6, a: 1 },
)
test(
	"Hue is required on Hsv object", //
	assertInvalidHsv,
	{ s: 0.5, v: 0.6, a: 1 },
)

test(
	"Hue must be a number", //
	assertInvalidHsv,
	{ h: "210", s: 0.5, v: 0.6, a: 1 },
)
test(
	"Saturation must be a number", //
	assertInvalidHsv,
	{ h: 210, s: "0.5", v: 0.6, a: 1 },
)
test(
	"Value must be a number", //
	assertInvalidHsv,
	{ h: 210, s: 0.5, v: "0.6", a: 1 },
)
test(
	"Alpha must be a number", //
	assertInvalidHsv,
	{ h: 210, s: 0.5, v: 0.6, a: "1" },
)

test(
	"Hsv object must not have extra properties", //
	assertInvalidHsv,
	{ h: 210, s: 0.5, v: 0.6, a: 1, extra: "property" },
)
