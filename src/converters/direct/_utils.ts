import type { UnknownColor } from "../../core/_utils.js"
import type { Converter } from "../_utils.js"

export function convert<F extends UnknownColor, T extends UnknownColor>(
	converter: Converter<F, T>,
): Converter<F, T> {
	return (input) => {
		const output = converter(input)
		if (input.alpha !== undefined) {
			output.alpha = input.alpha
		}
		return output
	}
}
