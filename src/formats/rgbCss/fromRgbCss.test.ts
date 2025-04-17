import test from "ava"

import type { Color } from "../../types.js"

import { execEqualsValue } from "../../_test-utils.js"

import fromRgbCss from "./fromRgbCss.js"

// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-valid-rgb.html
// prettier-ignore
const wptValidRgb = [
	["rgb(-51 51 102)", [-0.2, 0.2, 0.4, 1]],
	["rgb(-20% 20% 40%)", [-0.2, 0.2, 0.4, 1]],
	["rgb(510 51 102)", [2, 0.2, 0.4, 1]],
	["rgb(200% 20% 40%)", [2, 0.2, 0.4, 1]],
	["rgba(-51 51 102)", [-0.2, 0.2, 0.4, 1]],
	["rgba(-20% 20% 40%)", [-0.2, 0.2, 0.4, 1]],
	["rgba(51 51 102)", [2, 0.2, 0.4, 1]],
	["rgba(200% 20% 40%)", [2, 0.2, 0.4, 1]],
	["rgba(-51 51 102 / .5)", [-0.2, 0.2, 0.4, 0.5]],
	["rgba(-20% 20% 40% / 50%)", [-0.2, 0.2, 0.4, 0.5]],
	["rgba(512 51 102 / 50%)", [2, 0.2, 0.4, 0.5]],
	["rgba(200% 20% 40% / .5)", [2, 0.2, 0.4, 0.5]],

	["rgb(100% 51 40%)", [1, 0.2, 0.4, 1]],
	["rgb(255 20% 102)", [1, 0.2, 0.4, 1]],

	["rgb(510, 0, 0)", [2, 0, 0, 1]],
	["rgb(-510, 51, 102)", [-2, 0.2, 0.4, 1]],

	["rgb(calc(infinity), 0, 0)", [Infinity, 0, 0, 1]],
	["rgb(0, calc(infinity), 0)", [0, Infinity, 0, 1]],
	["rgb(0, 0, calc(infinity))", [0, 0, Infinity, 1]],
	["rgba(0, 0, 0, calc(infinity))", [0, 0, 0, Infinity]],
	["rgb(calc(-infinity), 0, 0)", [-Infinity, 0, 0, 1]],
	["rgb(0, calc(-infinity), 0)", [0, -Infinity, 0, 1]],
	["rgb(0, 0, calc(-infinity))", [0, 0, -Infinity, 1]],
	["rgba(0, 0, 0, calc(-infinity))", [0, 0, 0, -Infinity]],
	["rgb(calc(NaN), 0, 0)", [NaN, 0, 0, 1]],
	["rgb(0, calc(NaN), 0)", [0, NaN, 0, 1]],
	["rgb(0, 0, calc(NaN))", [0, 0, NaN, 1]],
	["rgba(0, 0, 0, calc(NaN))", [0, 0, 0, NaN]],
	["rgb(calc(0 / 0), 0, 0)", [NaN, 0, 0, 1]],
	["rgb(0, calc(0 / 0), 0)", [0, NaN, 0, 1]],
	["rgb(0, 0, calc(0 / 0))", [0, 0, NaN, 1]],
	["rgba(0, 0, 0, calc(0 / 0))", [0, 0, 0, NaN]],
] satisfies [string, Color][]

const macroParseValue = test.macro({
	exec: execEqualsValue(fromRgbCss),
	title(_: unknown, input: string, expected: Color) {
		return `WPT Parse ["${input}", [${expected.join(", ")}]]`
	},
})

for (const [input, expected] of wptValidRgb) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(macroParseValue, input, expected)
}
