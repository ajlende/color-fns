import test from "ava"

import { execInvalidValue, execValidValue } from "../../../_test-utils.js"

import { isHex } from "./is-hex.js"

const assertIsHex = execValidValue(isHex)
const assertIsNotHex = execInvalidValue(isHex)

test(
	"returns true when the color is a 3-digit hex color", //
	assertIsHex,
	"#fff",
)

test.skip(
	"returns true when the color is a 4-digit hex color", //
	assertIsHex,
	"#fff0",
)

test(
	"returns true when the color is a 6-digit hex color", //
	assertIsHex,
	"#ffffff",
)

test.skip(
	"returns true when the color is a 8-digit hex color", //
	assertIsHex,
	"#fffff00",
)

test(
	"returns false when the color is not a string", //
	assertIsNotHex,
	0xff,
)

test(
	"returns false when the color does not begin with a '#'", //
	assertIsNotHex,
	"fff",
)

test(
	"returns false when the color is not a valid length", //
	assertIsNotHex,
	"#fffff",
)

test(
	"returns false when the color contains invalid characters", //
	assertIsNotHex,
	"#ggg",
)
