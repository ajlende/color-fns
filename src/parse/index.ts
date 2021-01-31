import {
	Color,
	Parser,
	ExtractParserTypes,
	NonemptyReadonlyArray,
} from "../types"

/**
 * Parse a color from a static list of available parsers.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function parse<
	// Disable reason: Custom parsers that we know the type of cannot be
	// assigned to an `unknown` type argument.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	R extends NonemptyReadonlyArray<Parser<any>>,
	T extends ExtractParserTypes<R>
>(parsers: R, color: T[number]): Color {
	const parser = parsers.find(({ test }) => test(color))

	if (!parser)
		throw new RangeError("No parser for the given input was found.")

	return parser.parse(color)
}

// TODO: Maybe add an additional parse function that is less strict on the type-
// checking that allows dynamic arrays.
