import test from "ava"

import isHsl from "."

test("returns true when the input is a Vec4", (t) => {
	t.true(isHsl({ h: 0, s: 0.5, l: 0.5, a: 1 }))
})

test("returns false when the input does not have a hue", (t) => {
	t.false(isHsl({ s: 0.5, l: 0.5, a: 1 }))
})

test("returns false when the input does not have a saturation", (t) => {
	t.false(isHsl({ h: 0, l: 0.5, a: 1 }))
})

test("returns false when the input does not have a lightness", (t) => {
	t.false(isHsl({ h: 0, s: 0.5, a: 1 }))
})

test("returns false when the input does not have an alpha", (t) => {
	t.false(isHsl({ h: 0, s: 0.5, l: 0.5 }))
})

test("returns false when the input is null", (t) => {
	t.false(isHsl(null))
})

test("returns false when the input has extra values", (t) => {
	t.false(isHsl({ h: 0, s: 0.5, l: 0.5, a: 1, extra: 1 }))
})

test("returns false when the input isn't a number", (t) => {
	t.false(isHsl({ h: 0, s: 0.1, l: 0.3, a: "1" }))
})
