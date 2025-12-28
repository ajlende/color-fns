import test from "ava"

import type { sRGB } from "../../../core/spaces.js"
import type { GlVec4 } from "./_utils.js"
import { toVec4 } from "./to-vec4.js"

test("returns a Vec4", (t) => {
	const input: sRGB = { r: 0.1, g: 0.2, b: 0.3, alpha: 1 } as sRGB
	const output: GlVec4 = [0.1, 0.2, 0.3, 1]
	t.deepEqual(toVec4(input), output)
})
