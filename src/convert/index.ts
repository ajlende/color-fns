import { Color } from "../types"

/**
 * Convert a color from one representation to another.
 *
 * @param fromFn Function to convert from
 * @param toFn Function to convert to
 * @param color Input color to convert
 *
 * @return Converted color
 */
export default function convert<T, U>(
	fromFn: (x: T) => Color,
	toFn: (x: Color) => U,
	color: T,
): U {
	return toFn(fromFn(color))
}
