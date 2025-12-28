import type { sRGB } from "../../../core/spaces.js"
import { GlVec4 } from "./_utils.js"

export function fromVec4(color: GlVec4): sRGB {
	return { r: color[0], g: color[1], b: color[2], alpha: color[3] } as sRGB
}
