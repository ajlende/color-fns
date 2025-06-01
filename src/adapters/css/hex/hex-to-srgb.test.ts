import test from "ava"

import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import { hexToSrgb } from "./hex-to-srgb.js"
import { sRGB } from "../../../_utils.js"

const assertFromHex = execEqualsValue(hexToSrgb)
const assertRangeError = execRangeError(hexToSrgb)

test(
	"parses a 3-digit hex color", //
	assertFromHex,
	"#fff",
	{ r: 1, g: 1, b: 1 } as sRGB,
)

test.skip(
	"parses a 4-digit hex color", //
	assertFromHex,
	"#fff0",
	{ r: 1, g: 1, b: 1, a: 0 }, // as WithAlpha<sRGB>,
)

test(
	"parses a 6-digit hex color", //
	assertFromHex,
	"#ffffff",
	{ r: 1, g: 1, b: 1 } as sRGB,
)

test.skip(
	"parses a 8-digit hex color", //
	assertFromHex,
	"#ffffff00",
	{ r: 1, g: 1, b: 1, a: 0 }, // as WithAlpha<sRGB>,
)

test(
	"parses an uppercase hex color", //
	assertFromHex,
	"#FFF",
	{ r: 1, g: 1, b: 1 } as sRGB,
)

test(
	"throws Error when the color cannot be parsed", //
	assertRangeError,
	"#FFFFF",
)
