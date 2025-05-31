/**
 * Hexadecimal string preceded by a '#' as used in CSS.
 *
 * @example
 * ```
 * const hex3: Hex = "#369"      // 3-digit
 * const hex6: Hex = "#336699"   // 6-digit
 * const hex4: Hex = "#369c"     // 4-digit (with alpha)
 * const hex8: Hex = "#336699cc" // 8-digit (with alpha)
 * ```
 */
export type Hex = string & {
	readonly __space: "sRGB"
	readonly __format: "Hex"
}
