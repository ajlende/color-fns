import test from "ava"

import type { Color } from "../types.js"

import glMix from "./glMix.js"

test("mixes two colors with simple linear interpolation like WebGL", (t) => {
	const x: Color = [0, 0, 0, 1]
	const y: Color = [1, 1, 1, 1]
	const a = 0.5
	const mixed = [0.5, 0.5, 0.5, 1]
	t.deepEqual(glMix(x, y, a), mixed)
})
