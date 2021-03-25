import test from "ava"

import { Vec4, Hex, RgbString, HslString, Rgb, Hsl } from "../types"
import fromAny from "."

Object.entries({
	// Add every way of representing white here
	Hex: "#fff" as Hex,
	Hsl: { h: 0, s: 0, l: 1, a: 1 } as Hsl,
	HslString: "hsla(0, 0%, 100%, 1)" as HslString,
	Rgb: { r: 255, g: 255, b: 255, a: 1 } as Rgb,
	RgbString: "rgba(255, 255, 255, 1)" as RgbString,
	Vec4: [1, 1, 1, 1] as Vec4,
}).forEach(([type, value]) => {
	test(`parses ${type} type`, (t) => {
		t.deepEqual(fromAny(value), [1, 1, 1, 1])
	})
})
