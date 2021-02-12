import {
	Color,
	ExtractParserTypes,
	Hex,
	HslString,
	Parser,
	RgbString,
} from "../types"

import parse from "../parse"

import fromHex from "../fromHex"
import fromHslString from "../fromHslString"
import fromRgbString from "../fromRgbString"
import isHex from "../isHex"
import isHslString from "../isHslString"
import isRgbString from "../isRgbString"

/**
 * All parsers available
 */
const parsers = [
	{ test: isHex, parse: fromHex } as Parser<Hex>,
	{ test: isRgbString, parse: fromRgbString } as Parser<RgbString>,
	{ test: isHslString, parse: fromHslString } as Parser<HslString>,
] as const
type ParserTypes = ExtractParserTypes<typeof parsers>

/**
 * Convert a color from any available parser.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function fromString(color: ParserTypes[number]): Color {
	return parse(parsers, color)
}
