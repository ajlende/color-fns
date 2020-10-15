import test from "ava"

import isHex from "."

test("returns true when the color is a hex color", (t) => {
	t.true(isHex("#fff"))
})

test("returns false when the color is not a string", (t) => {
	t.false(isHex(0xff))
})

test("returns false when the color does not begin with a '#'", (t) => {
	t.false(isHex("fff"))
})

test("returns false when the color is not a valid length", (t) => {
	t.false(isHex("#fffff"))
})

test("returns false when the color contains invalid characters", (t) => {
	t.false(isHex("#ggg"))
})
