import { default as test } from "ava"

import type { Color } from "../../types.js"
import type { Lrgb } from "./types.js"
import toLrgb from "./toLrgb.js"

test("returns an Lrgb", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 1]
	const output: Lrgb = { r: 0.2, g: 0.4, b: 0.6, a: 1 }
	t.deepEqual(toLrgb(input), output)
})

test("handles zero alpha", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 0]
	const output: Lrgb = { r: 0.2, g: 0.4, b: 0.6, a: 0 }
	t.deepEqual(toLrgb(input), output)
})

test("handles partial alpha", (t) => {
	const input: Color = [0.2, 0.4, 0.6, 0.5]
	const output: Lrgb = { r: 0.2, g: 0.4, b: 0.6, a: 0.5 }
	t.deepEqual(toLrgb(input), output)
})
