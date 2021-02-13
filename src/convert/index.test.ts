import test from "ava"

import { Color } from "../types"

import convert from "."

type Color255 = [number, number, number, number]

test("converts using custom test functions", (t) => {
	const fromTest = (color: Color255): Color =>
		color.map((v) => v / 0xff) as Color
	const toTest = (color: Color): Color255 =>
		color.map((v) => v * 0xff) as Color255
	const color: Color255 = [0xff, 0xff, 0xff, 0xff]
	t.deepEqual(convert(fromTest, toTest, color), color)
})
