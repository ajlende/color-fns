import test from "ava"

import { convert, fromAny, toHex } from "./index.js"

test("converts from Vec4 to Hex", function (t) {
	t.is(convert(fromAny, toHex, [0.2, 0.4, 0.6, 1]), "#336699")
})
