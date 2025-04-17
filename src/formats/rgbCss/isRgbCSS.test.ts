import test from "ava"

import { execInvalidValue, execValidValue } from "../../_test-utils.js"

import isRgbCss from "./isRgbCss.js"

// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-invalid-rgb.html
// prettier-ignore
const wptInvalidRgb = [
	["rgb(none, none, none)", "The none keyword is invalid in legacy color syntax"],
	["rgba(none, none, none, none)", "The none keyword is invalid in legacy color syntax"],
	["rgb(128, 0, none)", "The none keyword is invalid in legacy color syntax"],
	["rgb(255, 255, 255, none)", "The none keyword is invalid in legacy color syntax"],

	["rgb(10%, 50%, 0)", "Values must be all numbers or all percentages"],
	["rgb(255, 50%, 0%)", "Values must be all numbers or all percentages"],
	["rgb(0, 0 0)", "Comma optional syntax requires no commas at all"],
	["rgb(,0, 0, 0)", "Leading commas are invalid"],
	["rgb(0, 0,, 0)", "Double commas are invalid"],
	["rgb(0, 0, 0deg)", "Angles are not accepted in the rgb function"],
	["rgb(0, 0, light)", "Keywords are not accepted in the rgb function"],
	["rgb()", "The rgb function requires 3 or 4 arguments"],
	["rgb(0)", "The rgb function requires 3 or 4 arguments"],
	["rgb(0, 0)", "The rgb function requires 3 or 4 arguments"],
	["rgb(0%)", "The rgb function requires 3 or 4 arguments"],
	["rgb(0%, 0%)", "The rgb function requires 3 or 4 arguments"],
	["rgba(10%, 50%, 0, 1)", "Values must be all numbers or all percentages"],
	["rgba(255, 50%, 0%, 1)", "Values must be all numbers or all percentages"],
	["rgba(0, 0, 0 0)", "Comma optional syntax requires no commas at all"],
	["rgba(0, 0, 0, 0deg)", "Angles are not accepted in the rgb function"],
	["rgba(0, 0, 0, light)", "Keywords are not accepted in the rgb function"],
	["rgba()", "The rgba function requires 3 or 4 arguments"],
	["rgba(0)", "The rgba function requires 3 or 4 arguments"],
	["rgba(0, 0, 0, 0, 0)", "The rgba function requires 3 or 4 arguments"],
	["rgba(0%)", "The rgba function requires 3 or 4 arguments"],
	["rgba(0%, 0%)", "The rgba function requires 3 or 4 arguments"],
	["rgba(0%, 0%, 0%, 0%, 0%)", "The rgba function requires 3 or 4 arguments"],
	["rgb(257, 0, 5 / 0)", "Cannot mix legacy and non-legacy formats"],
] satisfies [string, string][]

const macroInvalidValue = test.macro({
	exec: execInvalidValue(isRgbCss),
	title(providedTitle, input) {
		return `WPT Invalid ["${input}", "${providedTitle}"]`
	},
})

for (const [input, providedTitle] of wptInvalidRgb) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(providedTitle, macroInvalidValue, input)
}

// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-valid-rgb.html
// prettier-ignore
const wptValidRgb = [
	["rgb(none none none)", "Modern rgb syntax"],
	["rgb(none none none / none)", "Modern rgb syntax with alpha"],
	["rgb(128 none none)", "Modern rgb syntax with numeric component"],
	["rgb(128 none none / none)", "Modern rgb syntax with numeric component and alpha"],
	["rgb(none none none / .5)", "Modern rgb syntax with numeric alpha"],
	["rgb(20% none none)", "Modern rgb syntax with percentage component"],
	["rgb(20% none none / none)", "Modern rgb syntax with percentage component and alpha"],
	["rgb(none none none / 50%)", "Modern rgb syntax with percentage alpha"],
	["rgba(none none none)", "Modern rgba syntax"],
	["rgba(none none none / none)", "Modern rgba syntax"],
	["rgba(128 none none)", "Modern rgba syntax with numeric component and omitted alpha"],
	["rgba(128 none none / none)", "Modern rgba syntax with numeric component"],
	["rgba(none none none / .5)", "Modern rgba syntax with numeric alpha"],
	["rgba(20% none none)", "Modern rgba syntax with percentage component and omitted alpha"],
	["rgba(20% none none / none)", "Modern rgba syntax with percentage component"],
	["rgba(none none none / 50%)", "Modern rgba syntax with percentage alpha"],
	["rgb(-2 3 4)", "Modern rgb syntax with below gamut numeric components"],
	["rgb(-20% 20% 40%)", "Modern rgb syntax with below gamut percentage components"],
	["rgb(257 30 40)", "Modern rgb syntax with above gamut numeric components"],
	["rgb(250% 20% 40%)", "Modern rgb syntax with above gamut percentage components"],
	["rgba(-2 3 4)", "Modern rgba syntax with below gamut numeric components"],
	["rgba(-20% 20% 40%)", "Modern rgba syntax with below gamut percentage components"],
	["rgba(257 30 40)", "Modern rgba syntax with above gamut numeric components"],
	["rgba(250% 20% 40%)", "Modern rgba syntax with above gamut percentage components"],
	["rgba(-2 3 4 / .5)", "Modern rgba syntax with below gamut numeric components and numeric alpha"],
	["rgba(-20% 20% 40% / 50%)", "Modern rgba syntax with below gamut percentage components and percentage alpha"],
	["rgba(257 30 40 / 50%)", "Modern rgba syntax with above gamut numeric components and percentage alpha"],
	["rgba(250% 20% 40% / .5)", "Modern rgba syntax with above gamut percentage components and numeric alpha"],

	// Test with mixed components.
	["rgb(250% 51 40%)", "Modern rgb syntax with mixed components"],
	["rgb(255 20% 102)", "Modern rgb syntax with mixed components"],

	// rgb are in the range [0, 255], alpha is in the range [0, 1].
	["rgb(500, 0, 0)", "Legacy rgb syntax with above gamut numeric components"],
	["rgb(-500, 64, 128)", "Legacy rgb syntax with below gamut numeric components"],

	// calc(infinity) resolves to the upper bound while calc(-infinity) and calc(NaN) resolves the lower bound.
	["rgb(calc(infinity), 0, 0)", "Legacy rgb syntax with infinity red component"],
	["rgb(0, calc(infinity), 0)", "Legacy rgb syntax with infinity green component"],
	["rgb(0, 0, calc(infinity))", "Legacy rgb syntax with infinity blue component"],
	["rgba(0, 0, 0, calc(infinity))", "Legacy rgba syntax with infinity alpha"],
	["rgb(calc(-infinity), 0, 0)", "Legacy rgb syntax with negative infinity red component"],
	["rgb(0, calc(-infinity), 0)", "Legacy rgb syntax with negative infinity green component"],
	["rgb(0, 0, calc(-infinity))", "Legacy rgb syntax with negative infinity blue component"],
	["rgba(0, 0, 0, calc(-infinity))", "Legacy rgba syntax with negative infinity alpha"],
	["rgb(calc(NaN), 0, 0)", "Legacy rgb syntax with NaN red component"],
	["rgb(0, calc(NaN), 0)", "Legacy rgb syntax with NaN green component"],
	["rgb(0, 0, calc(NaN))", "Legacy rgb syntax with NaN blue component"],
	["rgba(0, 0, 0, calc(NaN))", "Legacy rgba syntax with NaN alpha"],
	["rgb(calc(0 / 0), 0, 0)", "Legacy rgb syntax with division by zero red component"],
	["rgb(0, calc(0 / 0), 0)", "Legacy rgb syntax with division by zero green component"],
	["rgb(0, 0, calc(0 / 0))", "Legacy rgb syntax with division by zero blue component"],
	["rgba(0, 0, 0, calc(0 / 0))", "Legacy rgba syntax with division by zero alpha"],
] satisfies [string, string][]

const macroValidValue = test.macro({
	exec: execValidValue(isRgbCss),
	title(providedTitle, input) {
		return `WPT Valid ["${input}", "${providedTitle}"]`
	},
})

for (const [input, providedTitle] of wptValidRgb) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(providedTitle, macroValidValue, input)
}
