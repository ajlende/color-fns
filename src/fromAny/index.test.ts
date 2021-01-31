import test from "ava"

import fromAny from "."

Object.entries({
	// Add every way of representing white here
	Hex: "#fff",
	Vec4: [1, 1, 1, 1],
}).forEach(([type, value]) => {
	test(`parses ${type} type`, (t) => {
		t.deepEqual(fromAny(value), [1, 1, 1, 1])
	})
})
