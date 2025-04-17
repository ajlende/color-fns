import type { Color } from "../types.js"

function lerp(x: number, y: number, a: number): number {
	// return x * (1 - a) + y * a
	return (y - x) * a + x
}

/**
 * Does a lerp on all dimensions like `mix` in WebGL.
 *
 * @see https://registry.khronos.org/OpenGL-Refpages/gl4/html/mix.xhtml
 *
 * TODO: Should the order match above or should ratio go first for curried functions?
 *
 * @param x
 * @param y
 * @param a A number in the range [0,1]
 *
 * @return Color in the intermediary format
 */
export default function glMix(x: Color, y: Color, a: number): Color {
	// if (a < 0 || a > 1) throw new RangeError("`a` should be in the range [0,1]")
	// Removing the type guard because typescript doesn't like mapping homogeneous tuples.
	return x.map((v, i) => lerp(v, y[i], a)) as Color
}
