import test from "ava"

import { Color, Vec4 } from "../types"
import toVec4 from "."

test("returns a Vec4", (t) => {
	const input: Color = [0.1, 0.2, 0.3, 1]
	const output: Vec4 = [0.1, 0.2, 0.3, 1]
	t.deepEqual(toVec4(input), output)
})
