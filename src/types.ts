import type { Vec4 } from "./formats/vec4/types.js"

/**
 * Internal color representation. Stored as a {@link Vec4}.
 */
export type Color = Vec4

export type { Vec4 }
export type { Hex } from "./formats/hex/types.js"
export type { Hsl } from "./formats/hsl/types.js"
export type { HslString } from "./formats/hslString/types.js"
export type { Hsv } from "./formats/hsv/types.js"
export type { RgbString } from "./formats/rgbString/types.js"
export type { Rgb } from "./formats/rgb/types.js"

export type {
	ColorType,
	NonemptyReadonlyArray,
	ExtractColorTypes,
} from "./formats/types.js"
