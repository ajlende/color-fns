import type {
	Color,
	ExtractColorTypes,
	Hex,
	Hsl,
	HslString,
	ColorType,
	Rgb,
	RgbString,
	Vec4,
} from "./types.js"

import fromList from "./fromList.js"

import fromHex from "./fromHex.js"
import fromHsl from "./fromHsl.js"
import fromHslString from "./fromHslString.js"
import fromRgb from "./fromRgb.js"
import fromRgbString from "./fromRgbString.js"
import fromVec4 from "./fromVec4.js"
import isHex from "./isHex.js"
import isHsl from "./isHsl.js"
import isHslString from "./isHslString.js"
import isRgb from "./isRgb.js"
import isRgbString from "./isRgbString.js"
import isVec4 from "./isVec4.js"

/**
 * All parsers available
 */
const colorTypes = [
	{ isType: isVec4, fromType: fromVec4 } as ColorType<Vec4>,
	{ isType: isRgb, fromType: fromRgb } as ColorType<Rgb>,
	{ isType: isHsl, fromType: fromHsl } as ColorType<Hsl>,
	{ isType: isHex, fromType: fromHex } as ColorType<Hex>,
	{ isType: isRgbString, fromType: fromRgbString } as ColorType<RgbString>,
	{ isType: isHslString, fromType: fromHslString } as ColorType<HslString>,
] as const
type ParserTypes = ExtractColorTypes<typeof colorTypes>

/**
 * Convert a color from any available parser.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function fromAny(color: ParserTypes[number]): Color {
	return fromList(colorTypes, color)
}
