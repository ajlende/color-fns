import test from "ava"

import convert from "."

test("converts using custom test functions", (t) => {
	const fromTest = (color) => color.map((v) => v / 0xff)
	const toTest = (color) => color.map((v) => v * 0xff)
	const color = [0xff, 0xff, 0xff, 0xff]
	t.deepEqual(convert(fromTest, toTest, color), color)
})
