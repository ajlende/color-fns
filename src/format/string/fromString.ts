import type {
	Color,
	ExtractColorTypes,
	Hex,
	HslString,
	ColorType,
	RgbString,
} from "../../types.js"

import fromSome from "../fromSome.js"

import fromHex from "./hex/fromHex.js"
import fromHslString from "./hslString/fromHslString.js"
import fromRgbString from "./rgbString/fromRgbString.js"
import isHex from "./hex/isHex.js"
import isHslString from "./hslString/isHslString.js"
import isRgbString from "./rgbString/isRgbString.js"

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
	return fromSome(parsers, color)
}
