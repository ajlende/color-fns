import {
	Color,
	ExtractParserTypes,
	Hex,
	Hsl,
	HslString,
	Parser,
	Rgb,
	RgbString,
	Vec4,
} from "../types"

import parse from "../parse"

import fromHex from "../fromHex"
import fromHsl from "../fromHsl"
import fromHslString from "../fromHslString"
import fromRgb from "../fromRgb"
import fromRgbString from "../fromRgbString"
import fromVec4 from "../fromVec4"
import isHex from "../isHex"
import isHsl from "../isHsl"
import isHslString from "../isHslString"
import isRgb from "../isRgb"
import isRgbString from "../isRgbString"
import isVec4 from "../isVec4"

/**
 * All parsers available
 */
const parsers = [
	{ test: isVec4, parse: fromVec4 } as Parser<Vec4>,
	{ test: isRgb, parse: fromRgb } as Parser<Rgb>,
	{ test: isHsl, parse: fromHsl } as Parser<Hsl>,
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
export default function fromAny(color: ParserTypes[number]): Color {
	return parse(parsers, color)
}
