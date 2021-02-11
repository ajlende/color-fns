import test, { ExecutionContext } from "ava"

import isHslString from "."

function assertIsHslString(
	t: ExecutionContext,
	input: unknown,
	expected: boolean,
) {
	t[expected ? "true" : "false"](isHslString(input))
}

test(
	"returns true when the input is a simple RGB string",
	assertIsHslString,
	"hsl(210, 50%, 40%)",
	true,
)

test(
	"returns true when the input has an alpha value",
	assertIsHslString,
	"hsl(210, 50%, 40%, 0.5)",
	true,
)

test(
	"returns true when input values are floating point",
	assertIsHslString,
	"hsl(210.0125, .5%, 12%)",
	true,
)

test(
	"returns true when input values are exponential",
	assertIsHslString,
	"hsl(21e1, .5e2%, 400E-1%, 0.8e0)",
	true,
)

test(
	"returns true when input values are spaced differently",
	assertIsHslString,
	"hsl(	210,	50%,	40%	)",
	true,
)

test(
	"returns true when input values have newlines between them",
	assertIsHslString,
	`
		hsl(
			210,
			50%,
			40%
		)
	`,
	true,
)

test(
	"returns true even when input values are out of gamut",
	assertIsHslString,
	"hsl(570, -50%, -40%, 2)",
	true,
)

test(
	"returns false when the input uses units",
	assertIsHslString,
	"hsl(210deg, 50%, 40%)",
	false,
)

test(
	"returns false when the input uses space delimiters",
	assertIsHslString,
	"hsl( 210 50% 40% / 0.8)",
	false,
)

test(
	"returns false when the function is incorrect",
	assertIsHslString,
	"rgb(210, 50%, 40%, 0.8)",
	false,
)
