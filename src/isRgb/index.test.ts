import test from "ava"

import isRgb from "."

test("returns true when the input is an Rgb", (t) => {
	t.true(isRgb({ r: 0, g: 0.1, b: 0.3, a: 1 }))
})

test("returns false when the input is missing a value", (t) => {
	t.false(isRgb({ r: 0, g: 0.1, b: 0.3 }))
})

test("returns false when the input has an extra value", (t) => {
	t.false(isRgb({ r: 0, g: 0.1, b: 0.3, a: 1, extra: 3 }))
})

test("returns false when the input isn't a number", (t) => {
	t.false(isRgb({ r: 0, g: 0.1, b: 0.3, a: "1" }))
})
