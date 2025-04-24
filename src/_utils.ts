// -------------------
// Color Space Utilities
// -------------------

/**
 * Color Space
 *
 * @typeParam K - The color space identifier
 * @typeParam T - The color space coordinate structure
 *
 * @remarks
 * A color space is a set of colors that are defined by a specific range of values.
 *
 * @example
 * ```ts
 * type RGB = ColorSpace<"sRGB", { r: number; g: number; b: number }>
 * ```
 *
 * @category Color Space Utilities
 */
export type ColorSpace<K extends string, T> = T & { readonly __space: K }

/**
 * An unknown color space.
 *
 * @category Color Space Utilities
 */
export type UnknownColorSpace = ColorSpace<string, unknown>

/**
 * Color Space Key
 *
 * Extract the key of a color space.
 *
 * @typeParam S - The color space
 *
 * @example
 * ```ts
 * type sRGBKey = ColorSpaceKey<sRGB> // "sRGB"
 * ```
 *
 * @category Color Space Utilities
 */
export type ColorSpaceKey<S extends UnknownColorSpace> = S["__space"]

/**
 * Color Space Data
 *
 * Extract the data of a color space.
 *
 * @typeParam S - The color space
 *
 * @example
 * ```ts
 * type sRGBData = ColorSpaceData<sRGB> // { r: number; g: number; b: number }
 * ```
 *
 * @category Color Space Utilities
 */
export type ColorSpaceData<S extends UnknownColorSpace> = Omit<S, "__space">

/**
 * A number with an associated reference range.
 *
 * @typeParam U - The minimum value of the range
 * @typeParam V - The maximum value of the range
 *
 * @example
 * ```ts
 * type Normalized = RefRange<0, 1>
 * type Percentage = RefRange<0, 100>
 * ```
 *
 * @category Color Space Utilities
 */
export type RefRange<U extends number, V extends number> = number & {
	readonly __range?: [min: U, max: V]
}

/**
 * A number with an associated reference angle.
 *
 * @typeParam U - The minimum value of the angle
 * @typeParam V - The maximum value of the angle
 *
 * @example
 * ```ts
 * type Degrees = RefAngle<0, 360>
 * type Radians = RefAngle<0, 2 * Math.PI>
 * ```
 *
 * @category Color Space Utilities
 */
export type RefAngle<U extends number, V extends number> = RefRange<U, V> & {
	readonly __angle?: true
}

// -------------------
// Color Spaces
// -------------------

/**
 * Adobe® 98 RGB compatible
 *
 * White point: D65
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * Another wide gamut RGB color space, encompassed roughly 50% of visible
 * colors, and popular in digital photography. The name 'Adobe® (1998) RGB' is
 * trademarked, but a colorspace which is 100% identical can be described as
 * compatible` as long as it uses a different name.
 *
 * {@link https://en.wikipedia.org/wiki/Adobe_RGB_color_space}
 *
 * @example
 * ```ts
 * const a98rgb = { r: 0, g: 0, b: 0 } as A98RGB
 * ```
 *
 * @category Color Spaces
 */
export type A98RGB = ColorSpace<
	"A98RGB",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * Linear Adobe® 98 RGB compatible
 *
 * White point: D65
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * {@link A98RGB}, but with a linear-light transfer function.
 *
 * @example
 * ```ts
 * const a98rgbLinear = { r: 0, g: 0, b: 0 } as A98RGB_Linear
 * ```
 *
 * @category Color Spaces
 */
export type A98RGB_Linear = ColorSpace<
	"A98RGB_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * ACEScc
 *
 * White point: ACES
 *
 * | Coord | Name  | Ref. Range      |
 * |-------|-------|-----------------|
 * | `r`   | Red   | [-0.358..1.468] |
 * | `g`   | Green | [-0.358..1.468] |
 * | `b`   | Blue  | [-0.358..1.468] |
 *
 * Academy Color Encoding System, using the wide gamut but physically realizable
 * AP1 primaries and Logarithmic Encoding. Used for color grading.
 *
 * {@link https://en.wikipedia.org/wiki/Academy_Color_Encoding_System}
 *
 * @example
 * ```ts
 * const acescc = { r: 0, g: 0, b: 0 } as ACEScc
 * ```
 *
 * @category Color Spaces
 */
export type ACEScc = ColorSpace<
	"ACEScc",
	{
		/** Red */
		r: RefRange<-0.358, 1.468>
		/** Green */
		g: RefRange<-0.358, 1.468>
		/** Blue */
		b: RefRange<-0.358, 1.468>
	}
>

/**
 * ACEScg
 *
 * White point: {@link ACES}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..65504] |
 * | `g`   | Green | [0..65504] |
 * | `b`   | Blue  | [0..65504] |
 *
 * Scene-referred Academy Color Encoding System, using the wide gamut but
 * physically realizable AP1 primaries and linear-light encoding. Used for
 * physical rendering.
 *
 * {@link https://en.wikipedia.org/wiki/Academy_Color_Encoding_System}
 *
 * @example
 * ```ts
 * const acescg = { r: 0, g: 0, b: 0 } as ACEScg
 * ```
 *
 * @category Color Spaces
 */
export type ACEScg = ColorSpace<
	"ACEScg",
	{
		/** Red */
		r: RefRange<0, 65504>
		/** Green */
		g: RefRange<0, 65504>
		/** Blue */
		b: RefRange<0, 65504>
	}
>

/**
 * CAM16-JMh
 *
 * White point: {@link D65}
 *
 * | Coord | Name         | Ref. Range |
 * |-------|--------------|------------|
 * | `j`   | Lightness    | [0..100]   |
 * | `m`   | Colorfulness | [0..145]   |
 * | `h`   | Hue (angle)  | [0..360]   |
 *
 * An improved and simplified development from the earlier CIECAM02 Color
 * Appearance Model, CAM16 provides three perceptual attributes: lightness J,
 * colorfulness M and hue quadrature h. The default viewing conditions are: D65
 * white point, adapting luminance of 64 lux (4 cd/m²), average surround and
 * less than full chromatic adaptation. This does mean that what other color
 * models consider to be achromatic colors may have a non-zero colorfulness (M).
 *
 * {@link https://www.researchgate.net/publication/318152296_Comprehensive_color_solutions_CAM16_CAT16_and_CAM16-UCS#fullTextFileContent}
 *
 * @example
 * ```ts
 * const cam16Jmh = { j: 0, m: 0, h: 0 } as CAM16_JMh
 * ```
 *
 * @category Color Spaces
 */
export type CAM16_JMh = ColorSpace<
	"CAM16_JMh",
	{
		/** Lightness */
		j: RefRange<0, 100>
		/** Colorfulness */
		m: RefRange<0, 145>
		/** Hue */
		h: RefAngle<0, 360>
	}
>
/**
 * HCT
 *
 * White point: D65
 *
 * | Coord | Name         | Ref. Range |
 * |-------|--------------|------------|
 * | `h`   | Hue (angle)  | [0..360]   |
 * | `c`   | Colorfulness | [0..145]   |
 * | `t`   | Tone         | [0..100]   |
 *
 * A color space that combines hue, colorfulness, and tone (lightness) to
 * provide a more perceptually uniform color space. Developed by Google.
 *
 * {@link https://material.io/blog/science-of-color-design}
 *
 * @example
 * ```ts
 * const hct = { h: 0, c: 0, t: 0 } as HCT
 * ```
 *
 * @category Color Spaces
 */
export type HCT = ColorSpace<
	"HCT",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Colorfulness */
		c: RefRange<0, 145>
		/** Tone */
		t: RefRange<0, 100>
	}
>
/**
 * HPLuv
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `l`   | Lightness   | [0..100]   |
 *
 * The HPLuv color space emphasizes perceptual uniformity specifically in its
 * lightness component. HPLuv ensures that changes in lightness are consistently
 * perceived by the human eye, regardless of the hue or saturation of the color.
 * The resulting palette is a subset of {@link sRGB} and the colors are mainly
 * pastel.
 *
 * {@link https://www.hsluv.org/comparison/}
 *
 * @example
 * ```ts
 * const hpluv = { h: 0, s: 0, l: 0 } as HPLuv
 * ```
 *
 * @category Color Spaces
 */
export type HPLuv = ColorSpace<
	"HPLuv",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Lightness */
		l: RefRange<0, 100>
	}
>

/**
 * HSL
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `l`   | Lightness   | [0..100]   |
 *
 * Polar transformation of {@link sRGB}, where hue is the angle around the color
 * wheel, saturation is the distance from the center, and lightness is the
 * height. Supported as early as CSS Color Level 3. Beware the perceptually
 * non-uniform hue, and don't compare the lightness of colors with different
 * hue.
 *
 * {@link https://en.wikipedia.org/wiki/HSL_and_HSV}
 *
 * @example
 * ```ts
 * const hsl = { h: 0, s: 0, l: 0 } as HSL
 * ```
 *
 * @category Color Spaces
 */
export type HSL = ColorSpace<
	"HSL",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Lightness */
		l: RefRange<0, 100>
	}
>

/**
 * HSLuv
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `l`   | Lightness   | [0..100]   |
 *
 * The HSLuv color space is a perceptually uniform adaptation of the traditional
 * {@link HSL} color model. Engineered upon the foundations of the {@link Luv}
 * color space, HSLuv ensures that colors that appear equally spaced in its
 * representation also present consistent perceptual differences to the human
 * observer. This results in a color space where changes in hue, saturation, or
 * lightness produce predictable and coherent visual outcomes, addressing
 * inconsistencies and unpredictable color shifts often found in standard HSL.
 *
 * {@link https://www.hsluv.org/comparison/}
 *
 * @example
 * ```ts
 * const hsluv = { h: 0, s: 0, l: 0 } as HSLuv
 * ```
 *
 * @category Color Spaces
 */
export type HSLuv = ColorSpace<
	"HSLuv",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Lightness */
		l: RefRange<0, 100>
	}
>

/**
 * HSV
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `v`   | Value       | [0..100]   |
 *
 * A polar transformation of {@link sRGB}, where hue is the angle around the
 * color wheel, saturation is the distance from the center, and value is the
 * height.
 *
 * {@link https://en.wikipedia.org/wiki/HSL_and_HSV}
 *
 * @example
 * ```ts
 * const hsv = { h: 0, s: 0, v: 0 } as HSV
 * ```
 *
 * @category Color Spaces
 */
export type HSV = ColorSpace<
	"HSV",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Value */
		v: RefRange<0, 100>
	}
>

/**
 * HWB
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `w`   | Whiteness   | [0..100]   |
 * | `b`   | Blackness   | [0..100]   |
 *
 * A polar transformation of {@link sRGB}, where hue is the angle around the
 * color wheel, whiteness is the amount of white to add, and blackness is the
 * amount of black to add.
 *
 * {@link https://en.wikipedia.org/wiki/HWB_color_model}
 *
 * @example
 * ```ts
 * const hwb = { h: 0, w: 0, b: 0 } as HWB
 * ```
 *
 * @category Color Spaces
 */
export type HWB = ColorSpace<
	"HWB",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Whiteness */
		w: RefRange<0, 100>
		/** Blackness */
		b: RefRange<0, 100>
	}
>

/**
 * ICTCP
 *
 * White point: {@link D65}
 *
 * | Coord | Name | Ref. Range  |
 * |-------|------|-------------|
 * | `i`   | I    | [0..1]      |
 * | `ct`  | CT   | [-0.5..0.5] |
 * | `cp`  | CP   | [-0.5..0.5] |
 *
 * A color space that improves on {@link Lab}, with better perceptual uniformity
 * and also supports High Dynamic Range (HDR), or very bright colors brighter
 * than a paper white. The transfer function is Dolby PQ, which is defined in
 * REC.2100 and used for HDR UHDTV.
 *
 * {@link https://en.wikipedia.org/wiki/ICtCp}
 *
 * @example
 * ```ts
 * const ictcp = { i: 0, ct: 0, cp: 0 } as ICTCP
 * ```
 *
 * @category Color Spaces
 */
export type ICTCP = ColorSpace<
	"ICTCP",
	{
		/** I */
		i: RefRange<0, 1>
		/** CT */
		ct: RefRange<-0.5, 0.5>
		/** CP */
		cp: RefRange<-0.5, 0.5>
	}
>

/**
 * JzCzHz
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range  |
 * |-------|-------------|-------------|
 * | `jz`  | Lightness   | [0..1]      |
 * | `cz`  | Chroma      | [0..0.26]   |
 * | `hz`  | Hue (angle) | [0..360]    |
 *
 * A polar form of {@link Jzazbz}.
 *
 * {@link http://www.color.org/events/prague/MuhammadSafdar2017.pdf}
 *
 * @example
 * ```ts
 * const jzczhz = { jz: 0, cz: 0, hz: 0 } as JzCzHz
 * ```
 *
 * @category Color Spaces
 */
export type JzCzHz = ColorSpace<
	"JzCzHz",
	{
		/** Lightness */
		jz: RefRange<0, 1>
		/** Chroma */
		cz: RefRange<0, 0.26>
		/** Hue */
		hz: RefAngle<0, 360>
	}
>
/**
 * Jzazbz
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range    |
 * |-------|-------------|---------------|
 * | `jz`  | Lightness   | [0..1]        |
 * | `az`  | Green-Red   | [-0.21..0.21] |
 * | `bz`  | Yellow-Blue | [-0.21..0.21] |
 *
 * A color space that improves on {@link Lab}, with much better perceptual
 * uniformity, and also supports High Dynamic Range (HDR), or very bright colors
 * brighter than a paper white. The transfer function is derived from Dolby PQ,
 * which is defined in REC.2100 and used for HDR UHDTV.
 *
 * {@link http://www.color.org/events/prague/MuhammadSafdar2017.pdf}
 *
 * @example
 * ```ts
 * const jzazbz = { jz: 0, az: 0, bz: 0 } as Jzazbz
 * ```
 *
 * @category Color Spaces
 */
export type Jzazbz = ColorSpace<
	"Jzazbz",
	{
		/** Lightness */
		jz: RefRange<0, 1>
		/** Green-Red */
		az: RefRange<-0.21, 0.21>
		/** Yellow-Blue */
		bz: RefRange<-0.21, 0.21>
	}
>

/**
 * LCH
 *
 * White point: {@link D50}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `l`   | Lightness   | [0..100]   |
 * | `c`   | Chroma      | [0..150]   |
 * | `h`   | Hue (angle) | [0..360]   |
 *
 * LCH is the polar form of {@link Lab}. Instead of juggling a and b, you
 * specify a Hue angle (starting from the positive a axis) and a Chroma, or
 * colorfulness, which is zero for neutral greys and increases as a color
 * becomes more intensely colorful.
 *
 * {@link https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC}
 *
 * @example
 * ```ts
 * const lch = { l: 0, c: 0, h: 0 } as LCH
 * ```
 *
 * @category Color Spaces
 */
export type LCH = ColorSpace<
	"LCH",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Chroma */
		c: RefRange<0, 150>
		/** Hue */
		h: RefAngle<0, 360>
	}
>

/**
 * LCHuv
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `l`   | Lightness   | [0..100]   |
 * | `c`   | Chroma      | [0..220]   |
 * | `h`   | Hue (angle) | [0..360]   |
 *
 * A polar form of {@link Luv}.
 *
 * {@link https://en.wikipedia.org/wiki/CIELUV}
 *
 * @example
 * ```ts
 * const lchuv = { l: 0, c: 0, h: 0 } as LCHuv
 * ```
 *
 * @category Color Spaces
 */
export type LCHuv = ColorSpace<
	"LCHuv",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Chroma */
		c: RefRange<0, 220>
		/** Hue */
		h: RefAngle<0, 360>
	}
>

/**
 * Lab D50
 *
 * White point: {@link D50}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `l`   | Lightness   | [0..100]   |
 * | `a`   | Green-Red   | [-125..125] |
 * | `b`   | Yellow-Blue | [-125..125] |
 *
 * The CIE L*a*b* color space with D50 illuminant, which is the basis for most
 * print color spaces.
 *
 * While the a* and b* axes are unbounded, in CSS 125 is equivalent to 100%,
 * while -125 is equivalent to -100%.
 *
 * {@link https://en.wikipedia.org/wiki/CIELAB_color_space}
 *
 * @example
 * ```ts
 * const labD50 = { l: 0, a: 0, b: 0 } as Lab_D50
 * ```
 *
 * @category Color Spaces
 */
export type Lab_D50 = ColorSpace<
	"Lab_D50",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Green-Red */
		a: RefRange<-125, 125>
		/** Yellow-Blue */
		b: RefRange<-125, 125>
	}
>

/**
 * CIE L*a*b* D65
 *
 * White point: {@link D65}
 *
 * | Coord | Name           | Ref. Range  |
 * |-------|----------------|-------------|
 * | `l`   | L* Lightness   | [0..100]    |
 * | `a`   | a* Green-Red   | [-125..125] |
 * | `b`   | b* Yellow-Blue | [-125..125] |
 *
 * The CIE L*a*b* color space with D65 illuminant, which is the basis for most
 * display color spaces.
 *
 * While the a* and b* axes are unbounded, in CSS 125 is equivalent to 100%,
 * while -125 is equivalent to -100%.
 *
 * {@link https://en.wikipedia.org/wiki/CIELAB_color_space}
 *
 * @example
 * ```ts
 * const labD65 = { l: 0, a: 0, b: 0 } as Lab_D65
 * ```
 *
 * @category Color Spaces
 */
export type Lab_D65 = ColorSpace<
	"Lab_D65",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Green-Red */
		a: RefRange<-125, 125>
		/** Yellow-Blue */
		b: RefRange<-125, 125>
	}
>

/**
 * CIE 1976 L*, u*, v*
 *
 * White point: {@link D65}
 *
 * | Coord | Name           | Ref. Range  |
 * |-------|----------------|-------------|
 * | `l`   | L* Lightness   | [0..100]    |
 * | `u`   | u* Green-Red   | [-215..215] |
 * | `v`   | v* Yellow-Blue | [-215..215] |
 *
 * CIELUV is a color space developed in 1976 for perceptually uniform color
 * representation, ideal for practical applications like digital displays. It's
 * derived from the CIE 1931 XYZ space and includes L* for luminance, and u*, v*
 * for chromaticity, capturing green–red and blue–yellow dimensions.
 *
 * While the u* and v* axes are unbounded, 215 is equivalent to 100%, while -215
 * is equivalent to -100% relative to the Display {@link P3} color space.
 *
 * {@link https://en.wikipedia.org/wiki/CIELUV}
 *
 * @example
 * ```ts
 * const luv = { l: 0, u: 0, v: 0 } as Luv
 * ```
 *
 * @category Color Spaces
 */
export type Luv = ColorSpace<
	"Luv",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Green-Red */
		u: RefRange<-215, 215>
		/** Yellow-Blue */
		v: RefRange<-215, 215>
	}
>

/**
 * OkLCh
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `l`   | Lightness   | [0..100]   |
 * | `c`   | Chroma      | [0..0.4]   |
 * | `h`   | Hue (angle) | [0..360]   |
 *
 * The polar (Hue, Chroma) form of {@link Oklab}.
 *
 * {@link https://bottosson.github.io/posts/oklab/}
 *
 * @example
 * ```ts
 * const oklch = { l: 0, c: 0, h: 0 } as OkLCh
 * ```
 *
 * @category Color Spaces
 */
export type OkLCh = ColorSpace<
	"OkLCh",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Chroma */
		c: RefRange<0, 0.4>
		/** Hue */
		h: RefAngle<0, 360>
	}
>

/**
 * Oklab
 *
 * White point: {@link D65}
 *
 * | Coord | Name      | Ref. Range |
 * |-------|-----------|------------|
 * | `l`   | Lightness | [0..100]   |
 * | `a`   | a         | [-0.4..0.4] |
 * | `b`   | b         | [-0.4..0.4] |
 *
 * An improved version of CIE Lab, with improved hue linearity and
 * orthogonality; derived from optimized LMS basis functions. Cube root transfer
 * function.
 *
 * {@link https://bottosson.github.io/posts/oklab/}
 *
 * @example
 * ```ts
 * const oklab = { l: 0, a: 0, b: 0 } as Oklab
 * ```
 *
 * @category Color Spaces
 */
export type Oklab = ColorSpace<
	"Oklab",
	{
		/** Lightness */
		l: RefRange<0, 100>
		/** Green-Red */
		a: RefRange<-0.4, 0.4>
		/** Yellow-Blue */
		b: RefRange<-0.4, 0.4>
	}
>

/**
 * Okhsl
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `l`   | Lightness   | [0..100]   |
 *
 * A {@link HSL} form of {@link Oklab}.
 *
 * {@link https://bottosson.github.io/posts/oklab/}
 *
 * @example
 * ```ts
 * const okhsl = { h: 0, s: 0, l: 0 } as Okhsl
 * ```
 *
 * @category Color Spaces
 */
export type Okhsl = ColorSpace<
	"Okhsl",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Lightness */
		l: RefRange<0, 100>
	}
>

/**
 * Okhsv
 *
 * White point: {@link D65}
 *
 * | Coord | Name        | Ref. Range |
 * |-------|-------------|------------|
 * | `h`   | Hue (angle) | [0..360]   |
 * | `s`   | Saturation  | [0..100]   |
 * | `v`   | Value       | [0..100]   |
 *
 * A {@link HSV} form of {@link Oklab}.
 *
 * {@link https://bottosson.github.io/posts/oklab/}
 *
 * @example
 * ```ts
 * const okhsv = { h: 0, s: 0, v: 0 } as Okhsv
 * ```
 *
 * @category Color Spaces
 */
export type Okhsv = ColorSpace<
	"Okhsv",
	{
		/** Hue */
		h: RefAngle<0, 360>
		/** Saturation */
		s: RefRange<0, 100>
		/** Value */
		v: RefRange<0, 100>
	}
>

/**
 * P3
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * The color space of most commercial wide gamut screens today. 50% larger gamut
 * (by volume) than sRGB. CSS Color level 4 allowed these colors to be used in
 * stylesheets for the first time. It is derived from a digital cinema projector
 * standard, DCI-P3 but the transfer curve, white point and viewing conditions
 * are the same as for sRGB.
 *
 * {@link https://en.wikipedia.org/wiki/DCI-P3#Display_P3}
 *
 * @example
 * ```ts
 * const p3 = { r: 0, g: 0, b: 0 } as P3
 * ```
 *
 * @category Color Spaces
 */
export type P3 = ColorSpace<
	"P3",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * Linear P3
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * A linear-light form of {@link P3}.
 *
 * @example
 * ```ts
 * const p3Linear = { r: 0, g: 0, b: 0 } as P3_Linear
 * ```
 *
 * @category Color Spaces
 */
export type P3_Linear = ColorSpace<
	"P3_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * ProPhoto
 *
 * White point: {@link D50}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * Very wide gamut RGB color space with primaries outside the range of human
 * vision. Designed to avoid hue shifts when sigmoid (contrast-changing)
 * functions are applied directly to the RGB channels, so it is popular as an
 * authoring space for digital photography. Includes 90% of visible colors, but
 * also encodes many values that are not physically realizable colors. Requires
 * gamut mapping before display.
 *
 * {@link https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space}
 *
 * @example
 * ```ts
 * const proPhoto = { r: 0, g: 0, b: 0 } as ProPhoto
 * ```
 *
 * @category Color Spaces
 */
export type ProPhoto = ColorSpace<
	"ProPhoto",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * ProPhoto Linear
 *
 * White point: {@link D50}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * {@link ProPhoto}, but with a linear-light transfer function.
 *
 * {@link https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space}
 *
 * @example
 * ```ts
 * const proPhotoLinear = { r: 0, g: 0, b: 0 } as ProPhoto_Linear
 * ```
 *
 * @category Color Spaces
 */
export type ProPhoto_Linear = ColorSpace<
	"ProPhoto_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * REC.2020
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * The color space of most modern HDR displays.
 *
 * {@link https://en.wikipedia.org/wiki/Rec.2020}
 *
 * @example
 * ```ts
 * const rec2020 = { r: 0, g: 0, b: 0 } as REC2020
 * ```
 *
 * @category Color Spaces
 */
export type REC2020 = ColorSpace<
	"REC2020",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * REC.2020 Linear
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * {@link REC2020}, but with a linear-light transfer function.
 *
 * {@link https://en.wikipedia.org/wiki/Rec.2020}
 *
 * @example
 * ```ts
 * const rec2020Linear = { r: 0, g: 0, b: 0 } as REC2020_Linear
 * ```
 *
 * @category Color Spaces
 */
export type REC2020_Linear = ColorSpace<
	"REC2020_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * REC.2100-HLG
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * One of the two HDR forms of Rec.2020; HLG stands for Hybrid Log-Gamma and is
 * designed to maximise compatibility with SDR broadcast standards. REC.2100-HLG
 * encodes relative scene luminance, so that it can be adapted to a wide range
 * of viewing conditions and display peak luminances. Media white is encoded at
 * a value of 0.75, values brighter than that are highlights.
 *
 * {@link https://en.wikipedia.org/wiki/Rec._2100}
 *
 * @example
 * ```ts
 * const rec2100Hlg = { r: 0, g: 0, b: 0 } as REC2100_HLG
 * ```
 *
 * @category Color Spaces
 */
export type REC2100_HLG = ColorSpace<
	"REC2100_HLG",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>
/**
 * REC.2100 Linear
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * ITU-R BT.2100-0 using a linear-light transfer function.
 *
 * {@link https://en.wikipedia.org/wiki/Rec._2100}
 *
 * @example
 * ```ts
 * const rec2100Linear = { r: 0, g: 0, b: 0 } as REC2100_Linear
 * ```
 *
 * @category Color Spaces
 */
export type REC2100_Linear = ColorSpace<
	"REC2100_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * REC.2100-PQ
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * One of the two HDR forms of Rec.2020; PQ stands for Perceptual Quantizer and
 * is designed to avoid banding when HDR material is encoded with only 10 or 12
 * bits per component. REC.2100-PQ encodes absolute display luminance, in the
 * range 0 to 10,000 cd/m2. Intended to be viewed in a dim viewing environment.
 * Media white is typically displayed at around 200 cd/m2 (varying with
 * content), values brighter than that are highlights.
 *
 * {@link https://en.wikipedia.org/wiki/Rec._2100}
 *
 * @example
 * ```ts
 * const rec2100Pq = { r: 0, g: 0, b: 0 } as REC2100_PQ
 * ```
 *
 * @category Color Spaces
 */
export type REC2100_PQ = ColorSpace<
	"REC2100_PQ",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * XYZ_D50
 *
 * White point: {@link D50}
 *
 * | Coord | Name | Ref. Range |
 * |-------|------|------------|
 * | `x`   | X    | [0..1]     |
 * | `y`   | Y    | [0..1]     |
 * | `z`   | Z    | [0..1]     |
 *
 * XYZ-D50 assumes the eye is adapted to the graphic arts D50 daylight white
 * point, which is the case for ProPhoto RGB. Measured CIE Lab values are also
 * typically reported with a D50 white point. Color.js will also internally
 * create XYZ color spaces with different white points as needed (for example,
 * converting to and from the ACES color spaces).
 *
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @example
 * ```ts
 * const xyzD50 = { x: 0, y: 0, z: 0 } as XYZ_D50
 * ```
 *
 * @category Color Spaces
 */
export type XYZ_D50 = ColorSpace<
	"XYZ_D50",
	{
		/** X */
		x: RefRange<0, 1>
		/** Y */
		y: RefRange<0, 1>
		/** Z */
		z: RefRange<0, 1>
	}
>

/**
 * XYZ_D65
 *
 * White point: {@link D65}
 *
 * | Coord | Name | Ref. Range |
 * |-------|------|------------|
 * | `x`   | X    | [0..1]     |
 * | `y`   | Y    | [0..1]     |
 * | `z`   | Z    | [0..1]     |
 *
 * The fundamental CIE color space, derived from color-matching experiments on
 * human vision. All other color spaces can be converted to XYZ. Encodes linear
 * light intensity. XYZ-D65 assumes the eye is adapted to the D65 daylight white
 * point, which is true for most color spaces.
 *
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @example
 * ```ts
 * const xyzD65 = { x: 0, y: 0, z: 0 } as XYZ_D65
 * ```
 *
 * @category Color Spaces
 */
export type XYZ_D65 = ColorSpace<
	"XYZ_D65",
	{
		/** X */
		x: RefRange<0, 1>
		/** Y */
		y: RefRange<0, 1>
		/** Z */
		z: RefRange<0, 1>
	}
>

/**
 * XYZ D65 Absolute
 *
 * White point: {@link D65}
 *
 * | Coord | Name | Ref. Range   |
 * |-------|------|--------------|
 * | `x`   | X    | [0..9504.7]  |
 * | `y`   | Y    | [0..10000]   |
 * | `z`   | Z    | [0..10888.3] |
 *
 * Absolute CIE XYZ, with a D65 whitepoint, as used in most HDR colorspaces as a
 * starting point. SDR spaces are converted per BT.2048 so that diffuse, media
 * white is 203 cd/m². Relative XYZ has Y=1 for media white.
 *
 * Maximum luminance (Y) in PQ is 10,000 cd/m² for setting reference ranges.
 *
 * @example
 * ```ts
 * const xyzD65Absolute = { x: 0, y: 0, z: 0 } as XYZ_D65_Absolute
 * ```
 *
 * @category Color Spaces
 */
export type XYZ_D65_Absolute = ColorSpace<
	"XYZ_D65_Absolute",
	{
		/** X */
		x: RefRange<0, 9504.7>
		/** Y */
		y: RefRange<0, 10000>
		/** Z */
		z: RefRange<0, 10888.3>
	}
>

/**
 * sRGB
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * The color space of all CSS colors before CSS Color Level 4, sRGB is derived
 * from the definition of HDTV. Most screens can display all, or very nearly
 * all, sRGB colors but there are many visible colors which lie outside the sRGB
 * gamut.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @example
 * ```ts
 * const srgb = { r: 0, g: 0, b: 0 } as sRGB
 * ```
 *
 * @category Color Spaces
 */
export type sRGB = ColorSpace<
	"sRGB",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * sRGB Linear
 *
 * White point: {@link D65}
 *
 * | Coord | Name  | Ref. Range |
 * |-------|-------|------------|
 * | `r`   | Red   | [0..1]     |
 * | `g`   | Green | [0..1]     |
 * | `b`   | Blue  | [0..1]     |
 *
 * {@link sRGB}, but with a linear-light transfer function.
 *
 * @example
 * ```ts
 * const srgbLinear = { r: 0, g: 0, b: 0 } as sRGB_Linear
 * ```
 *
 * @category Color Spaces
 */
export type sRGB_Linear = ColorSpace<
	"sRGB_Linear",
	{
		/** Red */
		r: RefRange<0, 1>
		/** Green */
		g: RefRange<0, 1>
		/** Blue */
		b: RefRange<0, 1>
	}
>

/**
 * Color space
 *
 * All color spaces.
 *
 * @category Color Spaces
 */
export type AnyColorSpace =
	| A98RGB
	| A98RGB_Linear
	| ACEScc
	| ACEScg
	| CAM16_JMh
	| HCT
	| HPLuv
	| HSL
	| HSLuv
	| HSV
	| HWB
	| ICTCP
	| JzCzHz
	| Jzazbz
	| LCH
	| LCHuv
	| Lab_D50
	| Lab_D65
	| Luv
	| OkLCh
	| Oklab
	| Okhsl
	| Okhsv
	| P3
	| P3_Linear
	| ProPhoto
	| ProPhoto_Linear
	| REC2020
	| REC2020_Linear
	| REC2100_HLG
	| REC2100_Linear
	| REC2100_PQ
	| XYZ_D50
	| XYZ_D65
	| XYZ_D65_Absolute
	| sRGB
	| sRGB_Linear

/**
 * RGB
 *
 * Alias for {@link sRGB}.
 *
 * @category Color Spaces
 */
export type RGB = sRGB

/**
 * XYZ
 *
 * Alias for {@link XYZ_D65}.
 *
 * @category Color Spaces
 */
export type XYZ = XYZ_D65

/**
 * Lab
 *
 * Alias for {@link Lab_D50}.
 *
 * @category Color Spaces
 */
export type Lab = Lab_D50

/**
 * A function that converts a color space to another color space.
 *
 * @template F - The source color space.
 * @template T - The target color space.
 *
 * @example
 * ```ts
 * export const srgbToHsl: Converter<sRGB, HSL> = (input) => {
 * 	// ...
 * 	return { h, s, l } as HSL
 * }
 * ```
 *
 * @category Color Space Conversion
 */
export interface Converter<
	F extends UnknownColorSpace,
	T extends UnknownColorSpace,
> {
	(input: F): T
	(input: ColorSpaceData<F>): T
}

/**
 * An unknown converter.
 *
 * @category Color Space Conversion
 */
export type UnknownConverter = Converter<UnknownColorSpace, UnknownColorSpace>
