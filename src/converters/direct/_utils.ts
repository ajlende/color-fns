import type { UnknownColor } from "../../_utils.js"
import type { Converter } from "../_utils.js"

export function convert<F extends UnknownColor, T extends UnknownColor>(
	converter: Converter<F, T>,
): Converter<F, T> {
	return (input) => {
		if (input.alpha === undefined) return converter(input)
		return { ...converter(input), alpha: input.alpha } as T
	}
}
