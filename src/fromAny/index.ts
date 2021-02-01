import {
	Color,
	ExtractParserTypes,
	Hex,
	Parser,
	RgbString,
	Vec4,
} from "../types"

import parse from "../parse"

import fromHex from "../fromHex"
import fromVec4 from "../fromVec4"
import isHex from "../isHex"
import isVec4 from "../isVec4"
import isRgbString from "../isRgbString"
import fromRgbString from "../fromRgbString"

/**
 * All parsers available
 */
const parsers = [
	{ test: isVec4, parse: fromVec4 } as Parser<Vec4>,
	{ test: isHex, parse: fromHex } as Parser<Hex>,
	{ test: isRgbString, parse: fromRgbString } as Parser<RgbString>,
] as const
type ParserTypes = ExtractParserTypes<typeof parsers>

/**
 * Convert a color from any available parser.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function fromAny(color: ParserTypes[number]): Color {
	return parse(parsers, color)
}
