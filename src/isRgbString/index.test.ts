import test from "ava"

import isRgbString from "."

test("returns true when the input is a simple RGB string", (t) => {
	t.true(isRgbString("rgb(127, 255, 0)"))
})

test("returns true when the input has an alpha value", (t) => {
	t.true(isRgbString("rgb(127, 255, 0, 0.5)"))
})

test("returns true when input values are floating point", (t) => {
	t.true(isRgbString("rgb(127.0125, .5, 12)"))
})

test("returns true when input values are exponential", (t) => {
	t.true(isRgbString("rgb(127e-2, 1e2, 2E-1)"))
})

test("returns true when input values are spaced differently", (t) => {
	t.true(isRgbString("rgb(	127.0125,	0.5,	0	)"))
})

test("returns true when input values have newlines between them", (t) => {
	t.true(
		isRgbString(
			`
rgb(
	127.0125,
	0.5,
	0
)
`,
		),
	)
})

test("returns true even when input values are out of gamut", (t) => {
	t.true(isRgbString("rgb(511, -.5, 0)"))
})

test("returns false when the input uses percentages", (t) => {
	t.false(isRgbString("rgb(50%, 25%, 0%)"))
})

test("returns false when the input uses space delimiters", (t) => {
	t.false(isRgbString("rgb( 127 255 0 )"))
})
