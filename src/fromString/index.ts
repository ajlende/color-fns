import {
	Color,
	ExtractColorTypes,
	Hex,
	HslString,
	ColorType,
	RgbString,
} from "../types"

import fromList from "../fromList"

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
	{ isType: isHex, fromType: fromHex } as ColorType<Hex>,
	{ isType: isRgbString, fromType: fromRgbString } as ColorType<RgbString>,
	{ isType: isHslString, fromType: fromHslString } as ColorType<HslString>,
] as const
type ParserTypes = ExtractColorTypes<typeof parsers>

/**
 * Convert a color from any available parser.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function fromString(color: ParserTypes[number]): Color {
	return fromList(parsers, color)
}
