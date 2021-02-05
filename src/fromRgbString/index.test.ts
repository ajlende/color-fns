import test from "ava"

import fromRgbString from "."

test("parses an rgb() string", (t) => {
	const color = fromRgbString("rgb(51, 102, 153)")
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("parses an rgba() string", (t) => {
	const color = fromRgbString("rgb(51, 102, 153, 0.8)")
	t.deepEqual(color, [0.2, 0.4, 0.6, 0.8])
})

test("allows arbitrary precision", (t) => {
	const color = fromRgbString("rgb(63.75,102,153,.5)")
	t.deepEqual(color, [0.25, 0.4, 0.6, 0.5])
})

test("allows out of gamut", (t) => {
	const color = fromRgbString("rgb(510, -0, -153, 2)")
	t.deepEqual(color, [2, -0, -0.6, 2])
})

test("allows exponential numbers", (t) => {
	const color = fromRgbString("rgb(5100e-2, 1.02e2, 1530E-1, .8e0)")
	t.deepEqual(color, [0.2, 0.4, 0.6, 0.8])
})

test("allows additional whitespace", (t) => {
	const color = fromRgbString(
		`
rgb(
	51,
	102,
	153
)
`,
	)
	t.deepEqual(color, [0.2, 0.4, 0.6, 1])
})

test("throws RangeError when the input uses percentages", (t) => {
	t.throws(() => fromRgbString("rgb(50%, 25%, 0%)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the input uses space delimiters", (t) => {
	t.throws(() => fromRgbString("rgb( 51 102 153 / 0.8)"), {
		instanceOf: RangeError,
	})
})

test("throws RangeError when the function is incorrect", (t) => {
	t.throws(() => fromRgbString("hsl(210, 40%, 50%, 0.5)"), {
		instanceOf: RangeError,
	})
})
