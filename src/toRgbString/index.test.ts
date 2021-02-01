import test from "ava"

import { Color, RgbString } from "../types"
import toRgbString from "."

test("returns an RgbString omitting the alpha value of one", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: RgbString = "rgb(20%,40%,60%)"
	t.deepEqual(toRgbString(input), output)
})

test("returns an RgbString with the alpha less than one", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 0.8]
	const output: RgbString = "rgba(20%,40%,60%,80%)"
	t.deepEqual(toRgbString(input), output)
})

test("out of range values are maintained", (t) => {
	const input: Color = [2, 4, 6, 1]
	const output: RgbString = "rgb(200%,400%,600%)"
	t.deepEqual(toRgbString(input), output)
})
