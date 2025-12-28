import test from "ava"

import type { sRGB } from "../../core/spaces.js"

import { over } from "./over.js"

test("converts using custom test functions", (t) => {
	const source = { r: 0, g: 0, b: 0, alpha: 0.5 } as sRGB
	const dest = { r: 1, g: 1, b: 1, alpha: 1 } as sRGB
	const composite = { r: 0.5, g: 0.5, b: 0.5, alpha: 1 } as sRGB
	t.deepEqual(over(source, dest), composite)
})
