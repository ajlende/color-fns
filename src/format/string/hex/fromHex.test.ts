import test from "ava"

import { execEqualsValue, execRangeError } from "../../../_test-utils.js"

import fromHex from "./fromHex.js"

const assertFromHex = execEqualsValue(fromHex)
const assertRangeError = execRangeError(fromHex)

test(
	"parses a 3-digit hex color", //
	assertFromHex,
	"#fff",
	[1, 1, 1, 1],
)

test(
	"parses a 4-digit hex color", //
	assertFromHex,
	"#fff0",
	[1, 1, 1, 0],
)

test(
	"parses a 6-digit hex color", //
	assertFromHex,
	"#ffffff",
	[1, 1, 1, 1],
)

test(
	"parses a 8-digit hex color", //
	assertFromHex,
	"#ffffff00",
	[1, 1, 1, 0],
)

test(
	"parses an uppercase hex color", //
	assertFromHex,
	"#FFF",
	[1, 1, 1, 1],
)

test(
	"throws Error when the color cannot be parsed", //
	assertRangeError,
	"#FFFFF",
)
