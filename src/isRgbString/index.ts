import { RgbString } from "../types"

const NUMBER = "[+-]?(?:\\d+|\\d*\\.\\d+)(?:e[+-]?\\d+)?"
const RGB_REGEX = new RegExp(
	`rgba?\\(\\s*${NUMBER}(?:\\s*,\\s*${NUMBER}){2,3}\\s*\\)`,
	"i",
)

/**
 * Test if the given color is an RGB string
 *
 * @param color Color to test for being an RGB string
 *
 * @return True if the color is an RGB string
 */
export default function isRgbString(color: unknown): color is RgbString {
	return typeof color === "string" && RGB_REGEX.test(color)
}
