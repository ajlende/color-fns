import test from "ava"

import type { Color } from "../types.js"

import over from "./over.js"

test("converts using custom test functions", (t) => {
	const source: Color = [0, 0, 0, 0.5]
	const dest: Color = [1, 1, 1, 1]
	const composite: Color = [0.5, 0.5, 0.5, 1]
	t.deepEqual(over(source, dest), composite)
})
