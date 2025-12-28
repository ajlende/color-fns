import test from "ava"

import type { sRGB } from "../../../core/spaces.js"
import { execEqualsValue } from "../../../_test-utils.js"

import { toRgbString } from "./to-rgb-string.js"

const assertToRgbString = execEqualsValue(toRgbString)

test(
	"returns an RgbString omitting the alpha value of one", //
	assertToRgbString,
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 1 } as sRGB,
	"rgb(51, 102, 153)",
)

test(
	"returns an RgbString with the alpha less than one", //
	assertToRgbString,
	{ r: 0.2, g: 0.4, b: 0.6, alpha: 0.8 } as sRGB,
	"rgba(51, 102, 153, 0.8)",
)

test(
	"out of range values are maintained", //
	assertToRgbString,
	{ r: 2, g: 4, b: 6, alpha: 1 } as sRGB,
	"rgb(510, 1020, 1530)",
)
