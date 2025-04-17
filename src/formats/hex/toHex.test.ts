import test from "ava"

import { execEqualsValue } from "../../_test-utils.js"

import toHex from "./toHex.js"

const assertToHex = execEqualsValue(toHex)

test(
	"returns a hex color", //
	assertToHex,
	[0.2, 0.4, 0.6, 1],
	"#336699",
)

test(
	"returns a hex color with alpha", //
	assertToHex,
	[0.2, 0.4, 0.6, 0.8],
	"#336699cc",
)
