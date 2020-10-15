import test, { Assertions } from "ava"

import isVec4 from "."

test("returns true when the input is a Vec4", (t) => {
	t.true(isVec4([0, 0.1, 0.3, 1]))
})

test("returns false when the input is not an array", (t: Assertions) => {
	t.false(isVec4("#fff"))
})

test("returns false when the input array does not have four elements", (t) => {
	t.false(isVec4([0, 0.1, 0.3]))
})

test("returns false when the input array is not of numbers", (t) => {
	t.false(isVec4(["a", "b", "c"]))
})
