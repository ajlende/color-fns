import test from "ava"

import type { HWB } from "./index.js"

import { pipe, srgbToHsv, hsvToHwb, convertAny } from "./index.js"

test("pipe converts from sRGB to HWB", function (t) {
	const result = pipe(srgbToHsv, hsvToHwb)({ b: 0, g: 0, r: 1, alpha: 1 })
	const expected = { h: 0, w: 0, b: 0, alpha: 1 }
	t.deepEqual(result, expected)
})

test("convertAny converts from sRGB to HWB", function (t) {
	const result = convertAny("sRGB", "HWB", { b: 0, g: 0, r: 1 })
	const expected = { h: 0, w: 0, b: 0 } as HWB
	t.deepEqual(result, expected)
})
