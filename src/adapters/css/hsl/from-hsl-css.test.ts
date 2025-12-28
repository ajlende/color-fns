import test from "ava"

import type { HSL } from "../../../core/spaces.js"

import { execEqualsValue } from "../../../_test-utils.js"

import { fromHslCss } from "./from-hsl-css.js"

// prettier-ignore
const wptValidHsl = [
  ["hsl(120 30% 50%)", { h: 120, s: 30, l: 50, alpha: 1 } as HSL],
  ["hsl(120 30% 50% / 0.5)", { h: 120, s: 30, l: 50, alpha: 0.5 } as HSL],
  ["hsl(none none none)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(0 0% 0%)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(none none none / none)", { h: 0, s: 0, l: 0, alpha: 0 } as HSL],
  ["hsl(0 0% 0% / 0)", { h: 0, s: 0, l: 0, alpha: 0 } as HSL],
  ["hsla(none none none)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsla(0 0% 0%)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsla(none none none / none)", { h: 0, s: 0, l: 0, alpha: 0 } as HSL],
  ["hsla(0 0% 0% / 0)", { h: 0, s: 0, l: 0, alpha: 0 } as HSL],
  ["hsl(120 none none)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(120 0% 0%)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(120 80% none)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(120 80% 0%)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(120 0% 50%)", { h: 0.5, s: 0.5, l: 0.5, alpha: 1 } as HSL],
  ["hsl(120 100% 50% / none)", { h: 0, s: 1, l: 0, alpha: 0 } as HSL],
  ["hsl(120 100% 50% / 0)", { h: 0, s: 1, l: 0, alpha: 0 } as HSL],
  ["hsl(none 100% 50%)", { h: 1, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(0 100% 50%)", { h: 1, s: 0, l: 0, alpha: 1 } as HSL],

  // Test with number components.
  ["hsl(120 30 50)", { h: 0.35, s: 0.65, l: 0.35, alpha: 1 } as HSL],
  ["hsl(120 30 50 / 0.5)", { h: 0.35, s: 0.65, l: 0.35, alpha: 0.5 } as HSL],
  ["hsl(120 30% 50)", { h: 0.35, s: 0.65, l: 0.35, alpha: 1 } as HSL],
  ["hsl(120 30% 50 / 0.5)", { h: 0.35, s: 0.65, l: 0.35, alpha: 0.5 } as HSL],
  ["hsl(120 30 50%)", { h: 0.35, s: 0.65, l: 0.35, alpha: 1 } as HSL],
  ["hsl(120 30 50% / 0.5)", { h: 0.35, s: 0.65, l: 0.35, alpha: 0.5 } as HSL],
  ["hsl(120 none 50)", { h: 0.5, s: 0.5, l: 0.5, alpha: 1 } as HSL],
  ["hsl(120 none 50 / 0.5)", { h: 0.5, s: 0.5, l: 0.5, alpha: 0.5 } as HSL],
  ["hsl(120 30 none)", { h: 0, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(120 30 none / 0.5)", { h: 0, s: 0, l: 0, alpha: 0.5 } as HSL],
  ["hsl(120 30 50 / none)", { h: 0.35, s: 0.65, l: 0.35, alpha: 0 } as HSL],

  // Test parse-time clamp of negative saturation (no clamp)
  ["hsl(0 -50% 40%)", { h: 0.2, s: 0.6, l: 0.6, alpha: 1 } as HSL],
  ["hsl(30 -50% 60)", { h: 0.6, s: 0.6, l: 0.6, alpha: 1 } as HSL],
  ["hsl(0 -50 40%)", { h: 0.4, s: 0.4, l: 0.4, alpha: 1 } as HSL],
  ["hsl(30 -50 60)", { h: 0.6, s: 0.6, l: 0.6, alpha: 1 } as HSL],

  // Test non-finite values. calc(infinity) → upper bound,
  // calc(-infinity) & NaN → lower bound.
  ["hsl(calc(infinity) 100% 50%)", { h: 1, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(calc(-infinity) 100% 50%)", { h: 1, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(calc(0 / 0) 100% 50%)", { h: 1, s: 0, l: 0, alpha: 1 } as HSL],
  ["hsl(90 50% 50% / calc(infinity))", { h: 0.5, s: 0.75, l: 0.25, alpha: 1 } as HSL],
  ["hsl(90 50% 50% / calc(-infinity))", { h: 0.5, s: 0.75, l: 0.25, alpha: 0 } as HSL],
  ["hsl(90 50% 50% / calc(0 / 0))", { h: 0.5, s: 0.75, l: 0.25, alpha: 0 } as HSL],
] satisfies [string, HSL][]

const macroParseValue = test.macro({
	exec: execEqualsValue(fromHslCss),
	title(_: unknown, input: string, expected: HSL) {
		return `WPT Parse ["${input}", [${expected.h}, ${expected.s}, ${expected.l}, ${expected.alpha}]]`
	},
})

for (const [input, expected] of wptValidHsl) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(macroParseValue, input, expected)
}
