import test from "ava"

import isRgbString from "."

test("returns true when the input is rgb, number, comma-delim, no alpha", (t) => {
	t.true(isRgbString("rgb(127, 255, 0)"))
})

test("returns true when the input is rgba, number, comma-delim, no alpha", (t) => {
	t.true(isRgbString("rgba(127, 255, 0)"))
})

test("returns true when the input is rgb, number, comma-delim, number alpha", (t) => {
	t.true(isRgbString("rgb(127, 255, 0, 1)"))
})

test("returns true when the input is rgba, number, comma-delim, number alpha", (t) => {
	t.true(isRgbString("rgba(127, 255, 0, 1)"))
})

test("returns true when the input is rgb, number, comma-delim, percent alpha", (t) => {
	t.true(isRgbString("rgb(127, 255, 0, 100%)"))
})

test("returns true when the input is rgba, number, comma-delim, percent alpha", (t) => {
	t.true(isRgbString("rgba(127, 255, 0, 100%)"))
})

test("returns true when the input is rgb, percent, comma-delim, no alpha", (t) => {
	t.true(isRgbString("rgb(50%, 100%, 0%)"))
})

test("returns true when the input is rgba, percent, comma-delim, no alpha", (t) => {
	t.true(isRgbString("rgba(50%, 100%, 0%)"))
})

test("returns true when the input is rgb, percent, comma-delim, number alpha", (t) => {
	t.true(isRgbString("rgb(50%, 100%, 0%, 1)"))
})

test("returns true when the input is rgba, percent, comma-delim, number alpha", (t) => {
	t.true(isRgbString("rgba(50%, 100%, 0%, 1)"))
})

test("returns true when the input is rgb, percent, comma-delim, percent alpha", (t) => {
	t.true(isRgbString("rgb(50%, 100%, 0%, 100%)"))
})

test("returns true when the input is rgba, percent, comma-delim, percent alpha", (t) => {
	t.true(isRgbString("rgba(50%, 100%, 0%, 100%)"))
})

test("returns true when the input is rgb, number, space-delim, no alpha", (t) => {
	t.true(isRgbString("rgb(127 255 0)"))
})

test("returns true when the input is rgba, number, space-delim, no alpha", (t) => {
	t.true(isRgbString("rgba(127 255 0)"))
})

test("returns true when the input is rgb, number, space-delim, number alpha", (t) => {
	t.true(isRgbString("rgb(127 255 0 / 1)"))
})

test("returns true when the input is rgba, number, space-delim, number alpha", (t) => {
	t.true(isRgbString("rgba(127 255 0 / 1)"))
})

test("returns true when the input is rgb, number, space-delim, percent alpha", (t) => {
	t.true(isRgbString("rgb(127 255 0 / 100%)"))
})

test("returns true when the input is rgba, number, space-delim, percent alpha", (t) => {
	t.true(isRgbString("rgba(127 255 0 / 100%)"))
})

test("returns true when the input is rgb, percent, space-delim, no alpha", (t) => {
	t.true(isRgbString("rgb(50% 100% 0%)"))
})

test("returns true when the input is rgba, percent, space-delim, no alpha", (t) => {
	t.true(isRgbString("rgba(50% 100% 0%)"))
})

test("returns true when the input is rgb, percent, space-delim, number alpha", (t) => {
	t.true(isRgbString("rgb(50% 100% 0% / 1)"))
})

test("returns true when the input is rgba, percent, space-delim, number alpha", (t) => {
	t.true(isRgbString("rgba(50% 100% 0% / 1)"))
})

test("returns true when the input is rgb, percent, space-delim, percent alpha", (t) => {
	t.true(isRgbString("rgb(50% 100% 0% / 100%)"))
})

test("returns true when the input is rgba, percent, space-delim, percent alpha", (t) => {
	t.true(isRgbString("rgba(50% 100% 0% / 100%)"))
})

test("returns false when the input is not a string", (t) => {
	t.false(isRgbString(null))
})

test("returns false when the input array does not have three elements", (t) => {
	t.false(isRgbString("rgb(0 0)"))
})
