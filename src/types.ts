// -------------------------------------
// Color representations
// -------------------------------------

export type Color = Vec4
export type Vec4 = [number, number, number, number]
export type Hex = string
export type HslString = string
export type RgbString = string
export interface Rgb {
	r: number
	g: number
	b: number
	a: number
}
export interface Hsl {
	h: number
	s: number
	l: number
	a: number
}

// -------------------------------------
// Function-related types
// -------------------------------------

export interface Parser<T> {
	parse: (color: T) => Color
	test: (color: unknown) => color is T
}

// -------------------------------------
// Utility types
// -------------------------------------

export type NonemptyReadonlyArray<T> = ReadonlyArray<T> & {
	readonly 0: T
}

export type ExtractParserTypes<T> = {
	[K in keyof T]: T[K] extends Parser<infer R> ? R : unknown
}
