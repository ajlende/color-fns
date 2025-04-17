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
} from "../types.js"

import fromSome from "./fromSome.js"

import fromHex from "./hex/fromHex.js"
import fromHsl from "./hsl/fromHsl.js"
import fromHslString from "./hslString/fromHslString.js"
import fromRgb from "./rgb/fromRgb.js"
import fromRgbString from "./rgbString/fromRgbString.js"
import fromVec4 from "./vec4/fromVec4.js"
import isHex from "./hex/isHex.js"
import isHsl from "./hsl/isHsl.js"
import isHslString from "./hslString/isHslString.js"
import isRgb from "./rgb/isRgb.js"
import isRgbString from "./rgbString/isRgbString.js"
import isVec4 from "./vec4/isVec4.js"

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
 * ⚠︎ Performance: This requires downloading all parsers ahead of time.
 *
 * @param color Any type of color that can be converted
 *
 * @return Color in the intermediary format
 */
export default function fromAny(color: ParserTypes[number]): Color {
	return fromSome(colorTypes, color)
}
