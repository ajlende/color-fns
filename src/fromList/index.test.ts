import test from "ava"

import fromList from "."
import { Color } from "../types"

test("parses with a test identity parser", (t) => {
	const parsers = [
		{
			isType: (c: unknown): c is Color => !!c,
			fromType: (c: Color) => c,
		},
	] as const
	const color: Color = [1, 1, 1, 1]
	t.is(fromList(parsers, color), color)
})

test("parses with the first matching parser", (t) => {
	const first: Color = [0, 0, 0, 0]
	const second: Color = [1, 1, 1, 1]
	const parsers = [
		{
			isType: (c: unknown): c is boolean => true,
			fromType: () => first,
		},
		{
			isType: (c: unknown): c is string => true,
			fromType: () => second,
		},
	] as const
	t.is(fromList(parsers, true), first)
})

test("throws RangeError when a suitable parser isn't found", (t) => {
	const parsers = [
		{
			isType: (c: unknown): c is boolean => false,
			fromType: () => [0, 0, 0, 0] as Color,
		},
	] as const
	t.throws(() => fromList(parsers, true), {
		instanceOf: RangeError,
	})
})
