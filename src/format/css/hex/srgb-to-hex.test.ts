import test from "ava"

import { execEqualsValue } from "../../../_test-utils.js"

import { sRGB } from "../../../_utils.js"

import { srgbToHex } from "./srgb-to-hex.js"

const assertToHex = execEqualsValue(srgbToHex)

test(
	"returns a hex color", //
	assertToHex,
	{ r: 0.2, g: 0.4, b: 0.6 } as sRGB,
	"#336699",
)

test.skip(
	"returns a hex color with alpha", //
	assertToHex,
	{ r: 0.2, g: 0.4, b: 0.6, a: 0.8 }, // as WithAlpha<sRGB>,
	"#336699cc",
)
