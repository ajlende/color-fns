import test from "ava"

import { execEqualsValue } from "../_test-utils.js"

import type { Vec4, Hex, RgbString, HslString, Rgb, Hsl } from "../types.js"
import fromAny from "./fromAny.js"

const assertFromAny = execEqualsValue(fromAny)

Object.entries({
	// Add every way of representing white here
	Hex: "#fff" as Hex,
	Hsl: { h: 0, s: 0, l: 1, a: 1 } as Hsl,
	HslString: "hsla(0, 0%, 100%, 1)" as HslString,
	Rgb: { r: 255, g: 255, b: 255, a: 1 } as Rgb,
	RgbString: "rgba(255, 255, 255, 1)" as RgbString,
	Vec4: [1, 1, 1, 1] as Vec4,
}).forEach(([type, value]) => {
	test(`parses ${type} type`, assertFromAny, value, [1, 1, 1, 1])
})
