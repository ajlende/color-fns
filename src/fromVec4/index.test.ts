import test from "ava"

import { Color, Vec4 } from "../types"
import fromVec4 from "."

test("parses a Vec4", (t) => {
	const input: Vec4 = [0.1, 0.2, 0.3, 1]
	const output: Color = [0.1, 0.2, 0.3, 1]
	t.deepEqual(fromVec4(input), output)
})
