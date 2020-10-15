import test from "ava"

import { Color, Hex } from "../types"
import toHex from "."

test("returns a hex color", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: Hex = "#336699"
	t.is(toHex(input), output)
})

test("returns a hex color with alpha", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 0.8]
	const output: Hex = "#336699cc"
	t.is(toHex(input), output)
})
