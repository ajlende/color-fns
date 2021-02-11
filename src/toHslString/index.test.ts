import test from "ava"

import { Color, HslString } from "../types"
import toHslString from "."

// TODO: Not sure how to test the rounding errors that happen in the conversion.

test("returns an HslString omitting the alpha value of one", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: HslString = "hsl(210, 49.99999999999999%, 40%)"
	t.deepEqual(toHslString(input), output)
})

test("returns an HslString with the alpha less than one", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 0.8]
	const output: HslString = "hsla(210, 49.99999999999999%, 40%, 0.8)"
	t.deepEqual(toHslString(input), output)
})

test("out of range values are maintained", (t) => {
	const input: Color = [2, 4, 6, 1]
	const output: HslString = "hsl(210, -66.66666666666666%, 400%)"
	t.deepEqual(toHslString(input), output)
})
