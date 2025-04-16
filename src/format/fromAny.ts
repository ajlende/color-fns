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

import fromHex from "./string/hex/fromHex.js"
import fromHsl from "./color-space/hsl/fromHsl.js"
import fromHslString from "./string/hslString/fromHslString.js"
import fromRgb from "./color-space/rgb/fromRgb.js"
import fromRgbString from "./string/rgbString/fromRgbString.js"
import fromVec4 from "./data/vec4/fromVec4.js"
import isHex from "./string/hex/isHex.js"
import isHsl from "./color-space/hsl/isHsl.js"
import isHslString from "./string/hslString/isHslString.js"
import isRgb from "./color-space/rgb/isRgb.js"
import isRgbString from "./string/rgbString/isRgbString.js"
import isVec4 from "./data/vec4/isVec4.js"

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
	return fromSome(colorTypes, color)
}
