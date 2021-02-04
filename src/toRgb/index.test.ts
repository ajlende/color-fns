import test from "ava"

import { Color, Rgb } from "../types"
import toRgb from "."

test("returns an Rgb", (t) => {
	const input: Color = [0.1, 0.2, 0.3, 1]
	const output: Rgb = { r: 0.1, g: 0.2, b: 0.3, a: 1 }
	t.deepEqual(toRgb(input), output)
})
