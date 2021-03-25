import test from "ava"

import { Color, Rgb } from "../types"
import fromRgb from "."

test("parses an Rgb", (t) => {
	const input: Rgb = { r: 51, g: 102, b: 153, a: 1 }
	const output: Color = [0.2, 0.4, 0.6, 1]
	t.deepEqual(fromRgb(input), output)
})
