import test from "ava"

import fromRgbString from "."

test("parses a rgb string", (t) => {
	const color = fromRgbString("rgb( 20% 40% 60% )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("parses a rgba string", (t) => {
	const color = fromRgbString("rgba( 20% 40% 60% )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("parses color numbers", (t) => {
	const color = fromRgbString("rgb( 51 102 153 )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("parses a rgb string with percentage alpha component", (t) => {
	const color = fromRgbString("rgb( 20% 40% 60% / 80% )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 0.8])
})

test("parses a rgb string with number alpha component", (t) => {
	const color = fromRgbString("rgb( 20% 40% 60% / 0.8 )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 0.8])
})

test("parses a rgb string with commas", (t) => {
	const color = fromRgbString("rgb(20%,40%,60%,80%)")
	t.deepEqual(color, [0.2, 0.4, 0.6, 0.8])
})

test("clamps percentage values", (t) => {
	const color = fromRgbString("rgb(200%,40%,60%,80%)")
	t.deepEqual(color, [1, 0.4, 0.6, 0.8])
})

test("clamps number values", (t) => {
	const color = fromRgbString("rgb( 512 102 153 )")
	t.deepEqual(color, [1, 0.4, 0.6, 1])
})

test("clamps alpha values", (t) => {
	const color = fromRgbString("rgb( 51 102 153 / 204 )")
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("allows arbitrary precision", (t) => {
	const color = fromRgbString("rgb(86.75309%,40%,60%,50%)")
	t.deepEqual(color, [0.8675309, 0.4, 0.6, 0.5])
})

test("throws Error when the color cannot be parsed", (t) => {
	t.throws(() => fromRgbString("rgb( cat, dog, mouse )"), {
		instanceOf: RangeError,
	})
})
