import { HslString } from "../types"

const NUMBER = "[+-]?(?:\\d+|\\d*\\.\\d+)(?:e[+-]?\\d+)?"
const PERCENT = `${NUMBER}%`
const HSL_REGEX = new RegExp(
	`hsla?\\(\\s*${NUMBER}(?:\\s*,\\s*${PERCENT}){2}(?:\\s*,\\s*${NUMBER})?\\s*\\)`,
	"i",
)

/**
 * Test if the given color is an HSL string
 *
 * @param color Color to test for being an HSL string
 *
 * @return True if the color is an HSL string
 */
export default function isHslString(color: unknown): color is HslString {
	return typeof color === "string" && HSL_REGEX.test(color)
}
