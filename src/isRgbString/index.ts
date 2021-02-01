import { RgbString } from "../types"

const COMMA_DELIM_REGEX = /rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?(\s*,\s*[\d.]+%?)?\s*\)/i
const SPACE_DELIM_REGEX = /rgba?\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?(\s+\/\s+[\d.]+%?)?\s*\)/i

/**
 * Test if the given color is a Vec4 color.
 *
 * @param color Color to test for being a Vec4 color
 *
 * @return True if the color is a Vec4 color
 */
export default function isRgbString(color: unknown): color is RgbString {
	return (
		typeof color === "string" &&
		(COMMA_DELIM_REGEX.test(color) || SPACE_DELIM_REGEX.test(color))
	)
}
