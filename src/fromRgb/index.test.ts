import test from "ava"

import { Color, Rgb } from "../types"
import fromRgb from "."

test("parses an Rgb", (t) => {
	const input: Rgb = { r: 0.1, g: 0.2, b: 0.3, a: 1 }
	const output: Color = [0.1, 0.2, 0.3, 1]
	t.deepEqual(fromRgb(input), output)
})
