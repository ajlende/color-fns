import test from "ava"

import { Color, Rgb } from "../types"
import toRgb from "."

test("returns an Rgb", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: Rgb = { r: 51, g: 102, b: 153, a: 1 }
	t.deepEqual(toRgb(input), output)
})
