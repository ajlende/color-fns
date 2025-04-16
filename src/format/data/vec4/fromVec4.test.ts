import { default as test } from "ava"

import type { Color, Vec4 } from "../../../types.js"
import fromVec4 from "./fromVec4.js"

test("parses a Vec4", (t) => {
	const input: Vec4 = [0.1, 0.2, 0.3, 1]
	const output: Color = [0.1, 0.2, 0.3, 1]
	t.deepEqual(fromVec4(input), output)
})
