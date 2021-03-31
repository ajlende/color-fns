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

import fromList from "../fromList"

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
	{ isType: isVec4, fromType: fromVec4 } as Parser<Vec4>,
	{ isType: isRgb, fromType: fromRgb } as Parser<Rgb>,
	{ isType: isHsl, fromType: fromHsl } as Parser<Hsl>,
	{ isType: isHex, fromType: fromHex } as Parser<Hex>,
	{ isType: isRgbString, fromType: fromRgbString } as Parser<RgbString>,
	{ isType: isHslString, fromType: fromHslString } as Parser<HslString>,
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
	return fromList(parsers, color)
}
