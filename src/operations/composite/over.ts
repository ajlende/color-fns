import type { sRGB } from "../../core/spaces.js"

/**
 * Porter Duff over operation.
 *
 * @param source Source color
 * @param dest Destination color
 * @returns Source color over destination color.
 */
export function over(source: sRGB, dest: sRGB): sRGB {
	const sourceAlpha = source.alpha ?? 1
	const destAlpha = dest.alpha ?? 1
	return {
		r: source.r * sourceAlpha + dest.r * destAlpha * (1 - sourceAlpha),
		g: source.g * sourceAlpha + dest.g * destAlpha * (1 - sourceAlpha),
		b: source.b * sourceAlpha + dest.b * destAlpha * (1 - sourceAlpha),
		alpha: sourceAlpha + destAlpha * (1 - sourceAlpha),
	} as sRGB
}
