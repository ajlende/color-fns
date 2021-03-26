import test from "ava"

import parse from "."
import { Color } from "../types"

test("parses with a test identity parser", (t) => {
	const parsers = [
		{
			test: (c: unknown): c is Color => !!c,
			convert: (c: Color) => c,
		},
	] as const
	const color: Color = [1, 1, 1, 1]
	t.is(parse(parsers, color), color)
})

test("parses with the first matching parser", (t) => {
	const first: Color = [0, 0, 0, 0]
	const second: Color = [1, 1, 1, 1]
	const parsers = [
		{
			test: (c: unknown): c is boolean => true,
			convert: () => first,
		},
		{
			test: (c: unknown): c is string => true,
			convert: () => second,
		},
	] as const
	t.is(parse(parsers, true), first)
})

test("throws RangeError when a suitable parser isn't found", (t) => {
	const parsers = [
		{
			test: (c: unknown): c is boolean => false,
			convert: () => [0, 0, 0, 0] as Color,
		},
	] as const
	t.throws(() => parse(parsers, true), {
		instanceOf: RangeError,
	})
})
