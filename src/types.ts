import type { Vec4 } from "./format/data/vec4/types.js"

/**
 * Internal color representation. Stored as a {@link Vec4}.
 */
export type Color = Vec4

export type { Vec4 }
export type { Hex } from "./format/string/hex/types.js"
export type { Hsl } from "./format/color-space/hsl/types.js"
export type { HslString } from "./format/string/hslString/types.js"
export type { Hsv } from "./format/color-space/hsv/types.js"
export type { RgbString } from "./format/string/rgbString/types.js"
export type { Rgb } from "./format/color-space/rgb/types.js"

export type {
	ColorType,
	NonemptyReadonlyArray,
	ExtractColorTypes,
} from "./format/types.js"
