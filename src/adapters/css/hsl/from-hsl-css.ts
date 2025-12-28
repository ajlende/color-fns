import type { HSL } from "../../../core/spaces.js"

import { fromHslString } from "../../string/hsl/from-hsl-string.js"

export function fromHslCss(input: string): HSL {
	// TODO: Implement the full specification.
	return fromHslString(input)
}
