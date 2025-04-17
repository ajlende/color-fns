import test from "ava"

import { execInvalidValue, execValidValue } from "../../_test-utils.js"

import isHex from "./isHex.js"

const assertIsHex = execValidValue(isHex)
const assertIsNotHex = execInvalidValue(isHex)

test(
	"returns true when the color is a hex color", //
	assertIsHex,
	"#fff",
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
