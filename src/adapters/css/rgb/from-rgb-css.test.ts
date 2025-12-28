import test from "ava"

import type { sRGB } from "../../../core/spaces.js"
import { execEqualsValue } from "../../../_test-utils.js"

import { fromRgbCss } from "./from-rgb-css.js"

// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-valid-rgb.html
// prettier-ignore
const wptValidRgb = [
	["rgb(-51 51 102)", { r: -0.2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgb(-20% 20% 40%)", { r: -0.2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgb(510 51 102)", { r: 2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgb(200% 20% 40%)", { r: 2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgba(-51 51 102)", { r: -0.2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgba(-20% 20% 40%)", { r: -0.2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgba(51 51 102)", { r: 2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgba(200% 20% 40%)", { r: 2, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgba(-51 51 102 / .5)", { r: -0.2, g: 0.2, b: 0.4, alpha: 0.5} as sRGB],
	["rgba(-20% 20% 40% / 50%)", { r: -0.2, g: 0.2, b: 0.4, alpha: 0.5} as sRGB],
	["rgba(512 51 102 / 50%)", { r: 2, g: 0.2, b: 0.4, alpha: 0.5} as sRGB],
	["rgba(200% 20% 40% / .5)", { r: 2, g: 0.2, b: 0.4, alpha: 0.5} as sRGB],

	["rgb(100% 51 40%)", { r: 1, g: 0.2, b: 0.4, alpha: 1} as sRGB],
	["rgb(255 20% 102)", { r: 1, g: 0.2, b: 0.4, alpha: 1} as sRGB],

	["rgb(510, 0, 0)", { r: 2, g: 0, b: 0, alpha: 1} as sRGB],
	["rgb(-510, 51, 102)", { r: -2, g: 0.2, b: 0.4, alpha: 1} as sRGB],

	["rgb(calc(infinity), 0, 0)", { r: Infinity, g: 0, b: 0, alpha: 1} as sRGB],
	["rgb(0, calc(infinity), 0)", { r: 0, g: Infinity, b: 0, alpha: 1} as sRGB],
	["rgb(0, 0, calc(infinity))", { r: 0, g: 0, b: Infinity, alpha: 1} as sRGB],
	["rgba(0, 0, 0, calc(infinity))", { r: 0, g: 0, b: 0, alpha: Infinity} as sRGB],
	["rgb(calc(-infinity), 0, 0)", { r: -Infinity, g: 0, b: 0, alpha: 1} as sRGB],
	["rgb(0, calc(-infinity), 0)", { r: 0, g: -Infinity, b: 0, alpha: 1} as sRGB],
	["rgb(0, 0, calc(-infinity))", { r: 0, g: 0, b: -Infinity, alpha: 1} as sRGB],
	["rgba(0, 0, 0, calc(-infinity))", { r: 0, g: 0, b: 0, alpha: -Infinity} as sRGB],
	["rgb(calc(NaN), 0, 0)", { r: NaN, g: 0, b: 0, alpha: 1} as sRGB],
	["rgb(0, calc(NaN), 0)", { r: 0, g: NaN, b: 0, alpha: 1} as sRGB],
	["rgb(0, 0, calc(NaN))", { r: 0, g: 0, b: NaN, alpha: 1} as sRGB],
	["rgba(0, 0, 0, calc(NaN))", { r: 0, g: 0, b: 0, alpha: NaN} as sRGB],
	["rgb(calc(0 / 0), 0, 0)", { r: NaN, g: 0, b: 0, alpha: 1} as sRGB],
	["rgb(0, calc(0 / 0), 0)", { r: 0, g: NaN, b: 0, alpha: 1} as sRGB],
	["rgb(0, 0, calc(0 / 0))", { r: 0, g: 0, b: NaN, alpha: 1} as sRGB],
	["rgba(0, 0, 0, calc(0 / 0))", { r: 0, g: 0, b: 0, alpha: NaN} as sRGB],
] satisfies [string, sRGB][]

const macroParseValue = test.macro({
	exec: execEqualsValue(fromRgbCss),
	title(_: unknown, input: string, expected: sRGB) {
		return `WPT Parse ["${input}", [${expected.r}, ${expected.g}, ${expected.b}, ${expected.alpha}]]`
	},
})

for (const [input, expected] of wptValidRgb) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(macroParseValue, input, expected)
}
