// -------------------------------------
// Types
// -------------------------------------

export type * from "./types.js"

// -------------------------------------
// RGB Color Space Objects
// -------------------------------------

// Vec4: Internal representation in sRGB space, also useful for WebGL, not clamped
export { default as fromVec4 } from "./formats/vec4/fromVec4.js"
export { default as isVec4 } from "./formats/vec4/isVec4.js"
export { default as toVec4 } from "./formats/vec4/toVec4.js"

// Rgb: An object representation of the color in sRGB space, not clamped
export { default as fromRgb } from "./formats/rgb/fromRgb.js"
export { default as isRgb } from "./formats/rgb/isRgb.js"
export { default as toRgb } from "./formats/rgb/toRgb.js"

// Hsl: An object representation of the color in sRGB HSL space, not clamped
export { default as fromHsl } from "./formats/hsl/fromHsl.js"
export { default as isHsl } from "./formats/hsl/isHsl.js"
export { default as toHsl } from "./formats/hsl/toHsl.js"

// Hsv: An object representation of the color in sRGB HSV space, not clamped
export { default as fromHsv } from "./formats/hsv/fromHsv.js"
export { default as isHsv } from "./formats/hsv/isHsv.js"
export { default as toHsv } from "./formats/hsv/toHsv.js"

// lRGB: linear space, not clamped
export { default as fromLrgb } from "./formats/lrgb/fromLrgb.js"
export { default as isLrgb } from "./formats/lrgb/isLrgb.js"
export { default as toLrgb } from "./formats/lrgb/toLrgb.js"

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

export { default as fromString } from "./formats/fromString.js"

// https://github.com/stayradiated/colr for fast implementations

// sRGB Hexadecimal: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
export { default as fromHex } from "./formats/hex/fromHex.js"
export { default as isHex } from "./formats/hex/isHex.js"
export { default as toHex } from "./formats/hex/toHex.js"

// sRGB Functions: rgb() and rgba()
export { default as fromRgbString } from "./formats/rgbString/fromRgbString.js"
export { default as isRgbString } from "./formats/rgbString/isRgbString.js"
export { default as toRgbString } from "./formats/rgbString/toRgbString.js"

// HSL Colors: hsl() and hsla()
export { default as fromHslString } from "./formats/hslString/fromHslString.js"
export { default as isHslString } from "./formats/hslString/isHslString.js"
export { default as toHslString } from "./formats/hslString/toHslString.js"

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

// Parse(parsers, color)
export { default as fromSome } from "./formats/fromSome.js"

// FromAny(color)
export { default as fromAny } from "./formats/fromAny.js"

// TODO: FromCss(color)

// TODO: Think of others

// -------------------------------------
// Convert
// -------------------------------------

export { default as convert } from "./operations/convert.js"

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

// color_spaces/other/format

// formats/string/any
