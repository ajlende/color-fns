import test from "ava"

import fromHex from "."

test("parses a 3-digit hex color", (t) => {
	t.deepEqual(fromHex("#fff"), [1, 1, 1, 1])
})

test("parses a 4-digit hex color", (t) => {
	t.deepEqual(fromHex("#fff0"), [1, 1, 1, 0])
})

test("parses a 6-digit hex color", (t) => {
	t.deepEqual(fromHex("#ffffff"), [1, 1, 1, 1])
})

test("parses a 8-digit hex color", (t) => {
	t.deepEqual(fromHex("#ffffff00"), [1, 1, 1, 0])
})

test("parses an uppercase hex color", (t) => {
	t.deepEqual(fromHex("#FFF"), [1, 1, 1, 1])
})

test("throws Error when the color cannot be parsed", (t) => {
	t.throws(() => fromHex("#FFFFF"), { instanceOf: RangeError })
})
