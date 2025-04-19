import { default as test } from "ava"

import isLrgb from "./isLrgb.js"

test("returns true when the input is an Lrgb", (t) => {
	t.true(isLrgb({ r: 0, g: 0.1, b: 0.3, a: 1 }))
})

test("returns false when the input is missing alpha", (t) => {
	t.false(isLrgb({ r: 0, g: 0.1, b: 0.3 }))
})

test("returns false when the input is missing red", (t) => {
	t.false(isLrgb({ g: 0.1, b: 0.3, a: 1 }))
})

test("returns false when the input is missing green", (t) => {
	t.false(isLrgb({ r: 0, b: 0.3, a: 1 }))
})

test("returns false when the input is missing blue", (t) => {
	t.false(isLrgb({ r: 0, g: 0.1, a: 1 }))
})

test("returns false when the input has an extra value", (t) => {
	t.false(isLrgb({ r: 0, g: 0.1, b: 0.3, a: 1, extra: 3 }))
})

test("returns false when the input isn't a number", (t) => {
	t.false(isLrgb({ r: 0, g: 0.1, b: 0.3, a: "1" }))
})

test("returns false when the input is null", (t) => {
	t.false(isLrgb(null))
})

test("returns false when the input is undefined", (t) => {
	t.false(isLrgb(undefined))
})

test("returns false when the input is a string", (t) => {
	t.false(isLrgb(""))
})

test("returns false when the input is an empty object", (t) => {
	t.false(isLrgb({}))
})
