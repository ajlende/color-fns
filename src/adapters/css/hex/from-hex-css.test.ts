import test from "ava"

import { color } from "../../../core/color.js"
import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import type { HexCss } from "./_utils.js"
import { fromHexCss } from "./from-hex-css.js"

const assertFromHex = execEqualsValue(fromHexCss)
const assertRangeError = execRangeError(fromHexCss)

test(
	"parses a 3-digit hex color", //
	assertFromHex,
	"#fff" as HexCss,
	color("sRGB", { r: 1, g: 1, b: 1 }),
)

test(
	"parses a 4-digit hex color", //
	assertFromHex,
	"#fff0" as HexCss,
	color("sRGB", { r: 1, g: 1, b: 1, alpha: 0 }),
)

test(
	"parses a 6-digit hex color", //
	assertFromHex,
	"#ffffff" as HexCss,
	color("sRGB", { r: 1, g: 1, b: 1 }),
)

test(
	"parses a 8-digit hex color", //
	assertFromHex,
	"#ffffff00" as HexCss,
	color("sRGB", { r: 1, g: 1, b: 1, alpha: 0 }),
)

test(
	"parses an uppercase hex color", //
	assertFromHex,
	"#FFF" as HexCss,
	color("sRGB", { r: 1, g: 1, b: 1 }),
)

test(
	"throws Error when the color cannot be parsed", //
	assertRangeError,
	"#FFFFF" as HexCss,
)
