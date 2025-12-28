import test from "ava"

import type { sRGB } from "../../core/spaces.js"

import { glMix } from "./mix.js"

test("mixes two colors with simple linear interpolation like WebGL", (t) => {
	const x = { r: 0, g: 0, b: 0, alpha: 1 } as sRGB
	const y = { r: 1, g: 1, b: 1, alpha: 1 } as sRGB
	const a = 0.5
	const mixed = { r: 0.5, g: 0.5, b: 0.5, alpha: 1 } as sRGB
	t.deepEqual(glMix(x, y, a), mixed)
})
