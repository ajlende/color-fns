import type { ColorData, ColorOf, ColorSpace } from "./_utils.js"
import type { AnyColorSpace } from "./spaces.js"

/**
 * Create a color
 *
 * @param space - The color space
 * @param data - The color data
 * @returns The color
 */
export function color<S extends ColorSpace<AnyColorSpace>>(
	space: S,
	data: ColorData<ColorOf<AnyColorSpace, S>>,
): ColorOf<AnyColorSpace, S> {
	// non-enumerable, non-writable, non-configurable
	Object.defineProperty(data, "__space", { value: space })
	return data as ColorOf<AnyColorSpace, S>
}
