import { default as test } from "ava"

import type { sRGB } from "../../../core/spaces.js"
import type { GlVec4 } from "./_utils.js"
import { fromVec4 } from "./from-vec4.js"

test("parses a Vec4", (t) => {
	const input: GlVec4 = [0.1, 0.2, 0.3, 1]
	const output: sRGB = { r: 0.1, g: 0.2, b: 0.3, alpha: 1 } as sRGB
	t.deepEqual(fromVec4(input), output)
})
