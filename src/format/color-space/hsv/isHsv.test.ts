import { default as test } from "ava"

import isHsv from "./isHsv.js"

test("returns true when the input is an Hsv", (t) => {
	t.true(isHsv({ h: 210, s: 0.5, v: 0.6, a: 1 }))
})

test("returns false when the input is not an object", (t) => {
	t.false(isHsv("hsv(210, 50%, 60%)"))
	t.false(isHsv(210))
	t.false(isHsv(null))
	t.false(isHsv(undefined))
})

test("returns false when the input is missing required properties", (t) => {
	t.false(isHsv({ h: 210, s: 0.5, v: 0.6 }))
	t.false(isHsv({ h: 210, s: 0.5, a: 1 }))
	t.false(isHsv({ h: 210, v: 0.6, a: 1 }))
	t.false(isHsv({ s: 0.5, v: 0.6, a: 1 }))
})

test("returns false when the input has non-number properties", (t) => {
	t.false(isHsv({ h: "210", s: 0.5, v: 0.6, a: 1 }))
	t.false(isHsv({ h: 210, s: "0.5", v: 0.6, a: 1 }))
	t.false(isHsv({ h: 210, s: 0.5, v: "0.6", a: 1 }))
	t.false(isHsv({ h: 210, s: 0.5, v: 0.6, a: "1" }))
})

test("returns false when the input has extra properties", (t) => {
	t.false(isHsv({ h: 210, s: 0.5, v: 0.6, a: 1, extra: "property" }))
})
