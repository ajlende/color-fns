/**
 * Hexadecimal string preceded by a '#' as used in CSS.
 *
 * @example
 * ```
 * const hex3: HexCss = "#369"      // 3-digit
 * const hex6: HexCss = "#336699"   // 6-digit
 * const hex4: HexCss = "#369c"     // 4-digit (with alpha)
 * const hex8: HexCss = "#336699cc" // 8-digit (with alpha)
 * ```
 */
export type HexCss = string & {
	readonly __space: "sRGB"
	readonly __format: "CssHex"
}
