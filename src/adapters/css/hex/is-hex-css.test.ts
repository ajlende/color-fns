import test from "ava"

import { execInvalidValue, execValidValue } from "../../../_test-utils.js"

import type { HexCss } from "./_utils.js"
import { isHexCss } from "./is-hex-css.js"

const assertIsHex = execValidValue(isHexCss)
const assertIsNotHex = execInvalidValue(isHexCss)

test(
	"returns true when the color is a 3-digit hex color", //
	assertIsHex,
	"#fff" as HexCss,
)

test(
	"returns true when the color is a 4-digit hex color", //
	assertIsHex,
	"#fff0" as HexCss,
)

test(
	"returns true when the color is a 6-digit hex color", //
	assertIsHex,
	"#ffffff" as HexCss,
)

test(
	"returns true when the color is a 8-digit hex color", //
	assertIsHex,
	"#fffff00" as HexCss,
)

test(
	"returns false when the color is not a string", //
	assertIsNotHex,
	0xff,
)

test(
	"returns false when the color does not begin with a '#'", //
	assertIsNotHex,
	"fff" as HexCss,
)

test(
	"returns false when the color is not a valid length", //
	assertIsNotHex,
	"#fffff" as HexCss,
)

test(
	"returns false when the color contains invalid characters", //
	assertIsNotHex,
	"#ggg" as HexCss,
)
