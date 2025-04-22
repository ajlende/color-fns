//
// -------------------------------------
// Types
// -------------------------------------

export * from "./_types.js"

// -------------------------------------
// Conversions
// -------------------------------------

export * from "./convert/hsl-to-srgb.js"
export * from "./convert/srgb-to-hsl.js"

export * from "./convert/hsv-to-hwb.js"
export * from "./convert/hwb-to-hsv.js"

export * from "./convert/hsv-to-srgb.js"
export * from "./convert/srgb-to-hsv.js"

export * from "./convert/srgb-linear-to-srgb.js"
export * from "./convert/srgb-to-linear-srgb.js"

export * from "./convert/srgb-linear-to-xyz-d65.js"
export * from "./convert/xyz-d65-to-linear-srgb.js"

// -------------------------------------
// RGB Color Space Objects
// -------------------------------------

// TODO: Vec4: In sRGB space, also useful for WebGL, not clamped
// TODO: Rgb: An object representation of the color in sRGB space, not clamped
// TODO: Hsl: An object representation of the color in sRGB HSL space, not clamped
// TODO: Hsv: An object representation of the color in sRGB HSV space, not clamped
// TODO: lRGB: linear space, not clamped

// -------------------------------------
// Matlab Colorspaces
// -------------------------------------

// https://www.mathworks.com/matlabcentral/mlc-downloads/downloads/submissions/28790/versions/5/previews/colorspace/colorspace.html#CUsage

// TODO: sRGB: IEC 61966-2-1, clamped [0,1]
// TODO: sRGB 255: IEC 61966-2-1, clamped [0,255], rounded
// TODO: Y'PbPr: Luma (ITU-R BT.601) + Chroma
// TODO: Y'CbCr: Luma + Chroma (digitized version of Y'PbPr)
// TODO: JPEG-Y'CbCr: Luma + Chroma space used in JFIF JPEG
// TODO: Y'UV: NTSC PAL Y'UV Luma + Chroma
// TODO: Y'IQ: NTSC Y'IQ Luma + Chroma
// TODO: Y'DbDr: SECAM Luma + Chroma
// TODO: HSV (or HSB): Hue Saturation Value/Brightness
// TODO: HSL (or HLS): Hue Saturation Luminance
// TODO: HSI: Hue Saturation Intensity
// TODO: CIE XYZ
// TODO: CIE L*a*b* (CIELAB)
// TODO: CIE L*u*v* (CIELUV)
// TODO: CIE L*ch (CIELCH)
// TODO: CIE CAT02 LMS

// -------------------------------------
// String Color Formats
// -------------------------------------

// These are simplified, stricter versions of the CSS Color Module Level 4
// https://www.w3.org/TR/css-color-4

// https://github.com/stayradiated/colr for fast implementations

// TODO: sRGB Hexadecimal: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
// TODO: sRGB Functions: rgb() and rgba()
// TODO: HSL Colors: hsl() and hsla()
// TODO: HSV Colors: hsv() and hsva()
// TODO: HWM Colors: hwb()
// TODO: Device-independent Colors: lab() and lch()
// TODO: Gray Colors: gray()
// TODO: Profiled, Device-dependant Colors: color()
// TODO: Device-dependent CMYK Colors: device-cmyk()

// -------------------------------------
// CSS Color Spaces
// -------------------------------------

// https://www.w3.org/TR/css-color-4

// Strict adherence to the CSS Color Module Level 4 specification
// `to` functions are not implemented. Use the string functions instead.

// TODO: <named-color> | transparent | currentColor
// TODO: <hex-color>
// TODO: <rgb()> | <rgba()>
// TODO: <hsl()> | <hsla()>
// TODO: <hwb()>
// TODO: <lab()> | <lch()> | <oklab()> | <oklch()>
// TODO: <color()>

// -------------------------------------
// Other Color Spaces
// -------------------------------------

// TODO: Spectrum http://www.brucelindbloom.com/index.html?Math.html
// TODO: Oklab https://bottosson.github.io/posts/oklab/
// TODO: IPT https://scholarworks.rit.edu/cgi/viewcontent.cgi?article=3862&context=theses

// @see https://vis4.net/chromajs

// TODO: Temperature (K)
// TODO: Random

// -------------------------------------
// Group parsing functions
// -------------------------------------

// TODO: Parse(parsers, color)
// TODO: FromAny(color)
// TODO: FromCss(color)
// TODO: Think of others

// -------------------------------------
// Color Transformations
// -------------------------------------

// @see https://vis4.net/chromajs

// TODO: Mix(ratio, mode, color1, color2) Linear interpolation (mode = 'lrgb')?
// TODO: SmoothStep(ratio, mode, color1, color2) Hermite interpolation?
// TODO: Average(mode, weights, colors)
// TODO: Blend(mode, color1, color2)
// TODO: Invert(color)
// TODO: Sepia(color)
// TODO: Grayscale(mode/weights?, color) (mode = 'average' | 'visual')?
// TODO: Saturate(value, color)
// TODO: Desaturate(value, color)
// TODO: Lighten(value, color)
// TODO: Darken(value, color)
// TODO: HueRotate(angle, unit, color) (unit = 'rad' | 'deg)?

// -------------------------------------
// Harmonies
// -------------------------------------

// @see https://color.adobe.com

// TODO: Analogous
// TODO: Monochromatic
// TODO: Triadic
// TODO: Complementary
// TODO: SplitComplementary
// TODO: DoubleSplitComplementary
// TODO: Tetradic (Rectangle)
// TODO: Square

// -------------------------------------
// Utility/Accessibility
// -------------------------------------

// @see https://vis4.net/chromajs

// TODO: Contrast(color1, color2) (WCAG contrast ratio)
// TODO: Distance(color1, color2, mode='lab')
// TODO: DeltaE(reference, sample, L=1, C=1)
// TODO: MostReadable(reference, colors[])
// TODO: IsReadable(reference, color, wcag_opts)
