import test from "ava"

import { Vec4, Hex, RgbString } from "../types"
import fromAny from "."

Object.entries({
	// Add every way of representing white here
	Hex: "#fff" as Hex,
	Vec4: [1, 1, 1, 1] as Vec4,
	RgbString: "rgba(255, 255, 255, 1)" as RgbString,
}).forEach(([type, value]) => {
	test(`parses ${type} type`, (t) => {
		t.deepEqual(fromAny(value), [1, 1, 1, 1])
	})
})
