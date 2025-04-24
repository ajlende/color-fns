# Ideas

## sRGB Color Space Objects

- [ ] `Vec4`: In sRGB space, also useful for WebGL, not clamped

## Matlab Colorspaces

[Matlab Colorspaces Documentation](https://www.mathworks.com/matlabcentral/mlc-downloads/downloads/submissions/28790/versions/5/previews/colorspace/colorspace.html#CUsage)

- [x] `sRGB`: IEC 61966-2-1, Ref. Range [0,1]
- [ ] `sRGB 255`: IEC 61966-2-1, Ref. Range [0,255]
- [ ] `Y'PbPr`: Luma (ITU-R BT.601) + Chroma
- [ ] `Y'CbCr`: Luma + Chroma (digitized version of Y'PbPr)
- [ ] `JPEG-Y'CbCr`: Luma + Chroma space used in JFIF JPEG
- [ ] `Y'UV`: NTSC PAL Y'UV Luma + Chroma
- [ ] `Y'IQ`: NTSC Y'IQ Luma + Chroma
- [ ] `Y'DbDr`: SECAM Luma + Chroma
- [x] `HSV`: Hue Saturation Value
- [ ] `HSB`: Hue Saturation Brightness
- [x] `HSL`: Hue Saturation Lightness
- [ ] `HLS`: Hue Luminance Saturation
- [ ] `HSI`: Hue Saturation Intensity
- [x] `CIE XYZ`
- [ ] `CIE L*a*b*` (CIELAB)
- [ ] `CIE L*u*v*` (CIELUV)
- [ ] `CIE L*ch` (CIELCH)
- [ ] `CIE CAT02 LMS`

## String Color Formats

These are simplified, stricter versions of the [CSS Color Module Level 4 Specification](https://www.w3.org/TR/css-color-4)

[Fast implementations reference](https://github.com/stayradiated/colr)

- [ ] `sRGB` Hexadecimal: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- [ ] `sRGB` Functions: `rgb()` and `rgba()`
- [ ] `HSL` Colors: `hsl()` and `hsla()`
- [ ] `HSV` Colors: `hsv()` and `hsva()`
- [ ] `HWM` Colors: `hwb()`
- [ ] Device-independent Colors: `lab()` and `lch()`
- [ ] Gray Colors: `gray()`
- [ ] Profiled, Device-dependant Colors: `color()`
- [ ] Device-dependent CMYK Colors: `device-cmyk()`

## CSS Color Spaces

[CSS Color Module Level 4 Specification](https://www.w3.org/TR/css-color-4)

Strict adherence to the CSS Color Module Level 4 specification.

- [ ] `<named-color>` | `transparent` | `currentColor`
- [ ] `<hex-color>`
- [ ] `<rgb()>` | `<rgba()>`
- [ ] `<hsl()>` | `<hsla()>`
- [ ] `<hwb()>`
- [ ] `<lab()>` | `<lch()>` | `<oklab()>` | `<oklch()>`
- [ ] `<color()>`

## Other Color Spaces

- [ ] `Spectrum` [Bruce Lindbloom's Math](http://www.brucelindbloom.com/index.html?Math.html)
- [ ] `Oklab` [Oklab Documentation](https://bottosson.github.io/posts/oklab/)
- [ ] `IPT` [IPT Thesis](https://scholarworks.rit.edu/cgi/viewcontent.cgi?article=3862&context=theses)

## Color Transformations

[Chroma.js Reference](https://vis4.net/chromajs)

- [ ] `Mix(ratio, mode, color1, color2)` Linear interpolation (mode = 'lrgb')?
- [ ] `SmoothStep(ratio, mode, color1, color2)` Hermite interpolation?
- [ ] `Average(mode, weights, colors)`
- [ ] `Blend(mode, color1, color2)`
- [ ] `Invert(color)`
- [ ] `Sepia(color)`
- [ ] `Grayscale(mode/weights?, color)` (mode = 'average' | 'visual')?
- [ ] `Saturate(value, color)`
- [ ] `Desaturate(value, color)`
- [ ] `Lighten(value, color)`
- [ ] `Darken(value, color)`
- [ ] `HueRotate(angle, unit, color)` (unit = 'rad' | 'deg)?

## Harmonies

[Adobe Color Reference](https://color.adobe.com)

- [ ] Analogous
- [ ] Monochromatic
- [ ] Triadic
- [ ] Complementary
- [ ] SplitComplementary
- [ ] DoubleSplitComplementary
- [ ] Tetradic (Rectangle)
- [ ] Square

## Utility/Accessibility

[Chroma.js Reference](https://vis4.net/chromajs)

- [ ] `Contrast(color1, color2)` (WCAG contrast ratio)
- [ ] `Distance(color1, color2, mode='lab')`
- [ ] `DeltaE(reference, sample, L=1, C=1)`
- [ ] `MostReadable(reference, colors[])`
- [ ] `IsReadable(reference, color, wcag_opts)`

## Other

- [ ] Temperature (K)
- [ ] Random