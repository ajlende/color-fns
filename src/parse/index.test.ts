import test from "ava"

import parse from "."
import { Color } from "../types"

test("parses with a test identity parser", (t) => {
	const parsers = [
		{
			test: (c: unknown): c is Color => !!c,
			parse: (c: Color) => c,
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
			parse: () => first,
		},
		{
			test: (c: unknown): c is string => true,
			parse: () => second,
		},
	] as const
	t.is(parse(parsers, true), first)
})
