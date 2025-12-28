import test from "ava"

import { execEqualsValue } from "../../../_test-utils.js"

import type { sRGB } from "../../../core/spaces.js"
import type { HexCss } from "./_utils.js"

import { toHexCss } from "./to-hex-css.js"

const assertToHex = execEqualsValue(toHexCss)

test(
	"returns a hex color", //
	assertToHex,
	{ r: 0.2, g: 0.4, b: 0.6 } as sRGB,
	"#336699" as HexCss,
)

test(
	"returns a hex color with alpha", //
	assertToHex,
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 0.8 } as sRGB,
	"#336699cc" as HexCss,
)
