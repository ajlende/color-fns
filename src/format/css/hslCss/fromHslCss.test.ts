import test from "ava"

import type { Color } from "../../../types.js"
import fromHslCss from "./fromHslCss.js"
import { execEqualsValue } from "../../../_test-utils.js"

// prettier-ignore
const wptValidHsl = [
  ["hsl(120 30% 50%)", [0.35, 0.65, 0.35, 1]],
  ["hsl(120 30% 50% / 0.5)", [0.35, 0.65, 0.35, 0.5]],
  ["hsl(none none none)", [0, 0, 0, 1]],
  ["hsl(0 0% 0%)", [0, 0, 0, 1]],
  ["hsl(none none none / none)", [0, 0, 0, 0]],
  ["hsl(0 0% 0% / 0)", [0, 0, 0, 0]],
  ["hsla(none none none)", [0, 0, 0, 1]],
  ["hsla(0 0% 0%)", [0, 0, 0, 1]],
  ["hsla(none none none / none)", [0, 0, 0, 0]],
  ["hsla(0 0% 0% / 0)", [0, 0, 0, 0]],
  ["hsl(120 none none)", [0, 0, 0, 1]],
  ["hsl(120 0% 0%)", [0, 0, 0, 1]],
  ["hsl(120 80% none)", [0, 0, 0, 1]],
  ["hsl(120 80% 0%)", [0, 0, 0, 1]],
  ["hsl(120 0% 50%)", [0.5, 0.5, 0.5, 1]],
  ["hsl(120 100% 50% / none)", [0, 1, 0, 0]],
  ["hsl(120 100% 50% / 0)", [0, 1, 0, 0]],
  ["hsl(none 100% 50%)", [1, 0, 0, 1]],
  ["hsl(0 100% 50%)", [1, 0, 0, 1]],

  // Test with number components.
  ["hsl(120 30 50)", [0.35, 0.65, 0.35, 1]],
  ["hsl(120 30 50 / 0.5)", [0.35, 0.65, 0.35, 0.5]],
  ["hsl(120 30% 50)", [0.35, 0.65, 0.35, 1]],
  ["hsl(120 30% 50 / 0.5)", [0.35, 0.65, 0.35, 0.5]],
  ["hsl(120 30 50%)", [0.35, 0.65, 0.35, 1]],
  ["hsl(120 30 50% / 0.5)", [0.35, 0.65, 0.35, 0.5]],
  ["hsl(120 none 50)", [0.5, 0.5, 0.5, 1]],
  ["hsl(120 none 50 / 0.5)", [0.5, 0.5, 0.5, 0.5]],
  ["hsl(120 30 none)", [0, 0, 0, 1]],
  ["hsl(120 30 none / 0.5)", [0, 0, 0, 0.5]],
  ["hsl(120 30 50 / none)", [0.35, 0.65, 0.35, 0]],

  // Test parse-time clamp of negative saturation (no clamp)
  ["hsl(0 -50% 40%)", [0.2, 0.6, 0.6, 1]],
  ["hsl(30 -50% 60)", [0.6, 0.6, 0.6, 1]],
  ["hsl(0 -50 40%)", [0.4, 0.4, 0.4, 1]],
  ["hsl(30 -50 60)", [0.6, 0.6, 0.6, 1]],

  // Test non-finite values. calc(infinity) → upper bound,
  // calc(-infinity) & NaN → lower bound.
  ["hsl(calc(infinity) 100% 50%)", [1, 0, 0, 1]],
  ["hsl(calc(-infinity) 100% 50%)", [1, 0, 0, 1]],
  ["hsl(calc(0 / 0) 100% 50%)", [1, 0, 0, 1]],
  ["hsl(90 50% 50% / calc(infinity))", [0.5, 0.75, 0.25, 1]],
  ["hsl(90 50% 50% / calc(-infinity))", [0.5, 0.75, 0.25, 0]],
  ["hsl(90 50% 50% / calc(0 / 0))", [0.5, 0.75, 0.25, 0]],
] satisfies [string, Color][]

const macroParseValue = test.macro({
	exec: execEqualsValue(fromHslCss),
	title(_: unknown, input: string, expected: Color) {
		return `WPT Parse ["${input}", [${expected.join(", ")}]]`
	},
})

for (const [input, expected] of wptValidHsl) {
	// TODO: Enable tests when implementation is added.
	// eslint-disable-next-line ava/no-skip-test
	test.skip(macroParseValue, input, expected)
}
