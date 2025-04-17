import { default as test } from "ava"

import type { Color, Rgb } from "../../types.js"
import toRgb from "./toRgb.js"

test("returns an Rgb", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: Rgb = { r: 51, g: 102, b: 153, a: 1 }
	t.deepEqual(toRgb(input), output)
})
