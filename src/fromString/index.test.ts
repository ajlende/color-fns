import test from "ava"

import { Hex, RgbString, HslString } from "../types"
import fromString from "."

Object.entries({
	// Add every string way of representing white here
	Hex3: "#fff" as Hex,
	Hex6: "#ffffff" as Hex,
	Hex4: "#ffff" as Hex,
	Hex8: "#ffffffff" as Hex,
	HslString: "hsl(0, 0%, 100%)" as HslString,
	HslaString: "hsla(0, 0%, 100%, 1)" as HslString,
	RgbString: "rgb(255, 255, 255)" as RgbString,
	RgbaString: "rgba(255, 255, 255, 1)" as RgbString,
}).forEach(([type, value]) => {
	test(`parses ${type} string`, (t) => {
		t.deepEqual(fromString(value), [1, 1, 1, 1])
	})
})
