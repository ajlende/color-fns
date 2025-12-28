import type { sRGB } from "../../core/spaces.js"

function lerp(x: number, y: number, a: number): number {
	// return x * (1 - a) + y * a
	return (y - x) * a + x
}

export function glMix(x: sRGB, y: sRGB, a: number): sRGB {
	if (a < 0 || a > 1) throw new RangeError("`a` should be in the range [0,1]")
	return {
		r: lerp(x.r, y.r, a),
		g: lerp(x.g, y.g, a),
		b: lerp(x.b, y.b, a),
		alpha: lerp(x.alpha ?? 1, y.alpha ?? 1, a),
	} as sRGB
}
