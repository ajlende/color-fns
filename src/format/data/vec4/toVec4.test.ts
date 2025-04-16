import test from "ava"

import type { Color, Vec4 } from "../../../types.js"
import toVec4 from "./toVec4.js"

test("returns a Vec4", (t) => {
	const input: Color = [0.1, 0.2, 0.3, 1]
	const output: Vec4 = [0.1, 0.2, 0.3, 1]
	t.deepEqual(toVec4(input), output)
})
