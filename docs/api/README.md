color-fns - v0.1.0

# color-fns - v0.1.0

## Table of contents

### Interfaces

- [Hsl](interfaces/hsl.md)
- [Hsv](interfaces/hsv.md)
- [Parser](interfaces/parser.md)
- [Rgb](interfaces/rgb.md)

### Type aliases

- [Color](README.md#color)
- [ExtractParserTypes](README.md#extractparsertypes)
- [Hex](README.md#hex)
- [HslString](README.md#hslstring)
- [NonemptyReadonlyArray](README.md#nonemptyreadonlyarray)
- [RgbString](README.md#rgbstring)
- [Vec4](README.md#vec4)

### Functions

- [convert](README.md#convert)
- [fromAny](README.md#fromany)
- [fromHex](README.md#fromhex)
- [fromHsl](README.md#fromhsl)
- [fromHslString](README.md#fromhslstring)
- [fromRgb](README.md#fromrgb)
- [fromRgbString](README.md#fromrgbstring)
- [fromVec4](README.md#fromvec4)
- [isHex](README.md#ishex)
- [isHsl](README.md#ishsl)
- [isHslString](README.md#ishslstring)
- [isRgb](README.md#isrgb)
- [isRgbString](README.md#isrgbstring)
- [isVec4](README.md#isvec4)
- [parse](README.md#parse)
- [toHex](README.md#tohex)
- [toHsl](README.md#tohsl)
- [toHslString](README.md#tohslstring)
- [toRgb](README.md#torgb)
- [toRgbString](README.md#torgbstring)
- [toVec4](README.md#tovec4)

## Type aliases

### Color

Ƭ **Color**: [*Vec4*](README.md#vec4)

Internal color representation. Stored as a [Vec4](README.md#vec4).

Defined in: [types.ts:8](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L8)

___

### ExtractParserTypes

Ƭ **ExtractParserTypes**<T\>: { [K in keyof T]: T[K] extends Parser<infer R\> ? R : unknown}

Utility type to help with type checking the [fromAny](README.md#fromany) and related
functions for converting from multiple types.

#### Type parameters:

Name |
------ |
`T` |

Defined in: [types.ts:186](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L186)

___

### Hex

Ƭ **Hex**: *string*

Hexadecimal string preceded by a '#' as used in CSS.

**`example`** 
```
const hex3: Hex = "#369"      // 3-digit
const hex6: Hex = "#336699"   // 6-digit
const hex4: Hex = "#369c"     // 4-digit (with alpha)
const hex8: Hex = "#336699cc" // 8-digit (with alpha)
```

Defined in: [types.ts:31](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L31)

___

### HslString

Ƭ **HslString**: *string*

HSL string as used in CSS.

**`example`** 
```
const hsl: HslString = "hsl(210, 50%, 40%)"
const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
```

Defined in: [types.ts:74](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L74)

___

### NonemptyReadonlyArray

Ƭ **NonemptyReadonlyArray**<T\>: *ReadonlyArray*<T\> & { `0`: T  }

Readonly array with at least one element.

#### Type parameters:

Name |
------ |
`T` |

Defined in: [types.ts:178](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L178)

___

### RgbString

Ƭ **RgbString**: *string*

RGB string as used in CSS.

**`example`** 
```
const hsl: HslString = "hsl(210, 50%, 40%)"
const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
```

Defined in: [types.ts:117](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L117)

___

### Vec4

Ƭ **Vec4**: [*number*, *number*, *number*, *number*]

Array of sRGB [red, green, blue, alpha] values in the range [0,1].

**`example`** 
```
const color: Vec4 = [0.2, 0.4, 0.6, 0.8]
```

Defined in: [types.ts:18](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L18)

## Functions

### convert

▸ **convert**<T, U\>(`fromFn`: (`x`: T) => [*Color*](README.md#color), `toFn`: (`x`: [*Color*](README.md#color)) => U, `color`: T): U

Convert a color from one representation to another.

#### Type parameters:

Name |
------ |
`T` |
`U` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`fromFn` | (`x`: T) => [*Color*](README.md#color) | Function to convert from   |
`toFn` | (`x`: [*Color*](README.md#color)) => U | Function to convert to   |
`color` | T | Input color to convert    |

**Returns:** U

Converted color

Defined in: [convert/index.ts:12](https://github.com/ajlende/color-fns/blob/59a932e/src/convert/index.ts#L12)

___

### fromAny

▸ **fromAny**(`color`: ParserTypes[*number*]): [*Color*](README.md#color)

Convert a color from any available parser.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | ParserTypes[*number*] | Any type of color that can be converted    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromAny/index.ts:48](https://github.com/ajlende/color-fns/blob/59a932e/src/fromAny/index.ts#L48)

___

### fromHex

▸ **fromHex**(`color`: [*Hex*](README.md#hex)): [*Color*](README.md#color)

Convert a hex string to a Color

**`see`** https://www.w3.org/TR/css-color-4/#hex-notation

**`throws`** {TypeError}
Thrown if the input string is not a valid hex format

#### Parameters:

Name | Type |
------ | ------ |
`color` | [*Hex*](README.md#hex) |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromHex/index.ts:15](https://github.com/ajlende/color-fns/blob/59a932e/src/fromHex/index.ts#L15)

___

### fromHsl

▸ **fromHsl**(`__namedParameters`: [*Hsl*](interfaces/hsl.md)): [*Color*](README.md#color)

Convert a HSL color to the intermediate format

**`see`** https://www.w3.org/TR/css-color-4/#hsl-to-rgb

#### Parameters:

• **__namedParameters**: [*Hsl*](interfaces/hsl.md)

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromHsl/index.ts:31](https://github.com/ajlende/color-fns/blob/59a932e/src/fromHsl/index.ts#L31)

___

### fromHslString

▸ **fromHslString**(`color`: [*HslString*](README.md#hslstring)): [*Color*](README.md#color)

Convert `hsl()` or `hsla()` to the intermediary Color format

**`see`** https://www.w3.org/TR/css-color-4/#the-hsl-notation

**`throws`** {RangeError}
Thrown if the input string is not a valid `hsl()` format.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*HslString*](README.md#hslstring) | `hsl()` or `hsla()` string    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromHslString/index.ts:18](https://github.com/ajlende/color-fns/blob/59a932e/src/fromHslString/index.ts#L18)

___

### fromRgb

▸ **fromRgb**(`color`: [*Rgb*](interfaces/rgb.md)): [*Color*](README.md#color)

Convert a color from an Rgb.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Rgb*](interfaces/rgb.md) | Input color to convert    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/fromRgb/index.ts#L10)

___

### fromRgbString

▸ **fromRgbString**(`color`: [*RgbString*](README.md#rgbstring)): [*Color*](README.md#color)

Convert simple RGB strings to the intermediary Color format

**`throws`** {RangeError}
Thrown if the input string is not a valid simple RGB format

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*RgbString*](README.md#rgbstring) | Simple RGB string    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromRgbString/index.ts:15](https://github.com/ajlende/color-fns/blob/59a932e/src/fromRgbString/index.ts#L15)

___

### fromVec4

▸ **fromVec4**(`color`: [*Vec4*](README.md#vec4)): [*Color*](README.md#color)

Convert a color from a Vec4.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Vec4*](README.md#vec4) | Input color to convert    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [fromVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/fromVec4/index.ts#L10)

___

### isHex

▸ **isHex**(`color`: *unknown*): color is string

Test if the given color is a Hex color.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being a Hex color    |

**Returns:** color is string

True if the color is a Hex color

Defined in: [isHex/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/isHex/index.ts#L10)

___

### isHsl

▸ **isHsl**(`color`: *unknown*): color is Hsl

Test if the given color is a Hsl color.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being a Hsl color    |

**Returns:** color is Hsl

True if the color is a Hsl color

Defined in: [isHsl/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/isHsl/index.ts#L10)

___

### isHslString

▸ **isHslString**(`color`: *unknown*): color is string

Test if the given color is an HSL string

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being an HSL string    |

**Returns:** color is string

True if the color is an HSL string

Defined in: [isHslString/index.ts:17](https://github.com/ajlende/color-fns/blob/59a932e/src/isHslString/index.ts#L17)

___

### isRgb

▸ **isRgb**(`color`: *unknown*): color is Rgb

Test if the given color is a Rgb color.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being an Rgb color    |

**Returns:** color is Rgb

True if the color is an Rgb color

Defined in: [isRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/isRgb/index.ts#L10)

___

### isRgbString

▸ **isRgbString**(`color`: *unknown*): color is string

Test if the given color is an RGB string

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being an RGB string    |

**Returns:** color is string

True if the color is an RGB string

Defined in: [isRgbString/index.ts:16](https://github.com/ajlende/color-fns/blob/59a932e/src/isRgbString/index.ts#L16)

___

### isVec4

▸ **isVec4**(`color`: *unknown*): color is Vec4

Test if the given color is a Vec4 color.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | *unknown* | Color to test for being a Vec4 color    |

**Returns:** color is Vec4

True if the color is a Vec4 color

Defined in: [isVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/isVec4/index.ts#L10)

___

### parse

▸ **parse**<R, T\>(`parsers`: R, `color`: T[*number*]): [*Color*](README.md#color)

Parse a color from a static list of available parsers.

#### Type parameters:

Name | Type |
------ | ------ |
`R` | readonly [*Parser*](interfaces/parser.md)<*any*\>[] & { `0`: [*Parser*](interfaces/parser.md)<*any*\>  } |
`T` | [*ExtractParserTypes*](README.md#extractparsertypes)<R\> |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`parsers` | R | - |
`color` | T[*number*] | Any type of color that can be converted    |

**Returns:** [*Color*](README.md#color)

Color in the intermediary format

Defined in: [parse/index.ts:15](https://github.com/ajlende/color-fns/blob/59a932e/src/parse/index.ts#L15)

___

### toHex

▸ **toHex**(`color`: [*Color*](README.md#color)): [*Hex*](README.md#hex)

Convert an RGB object to a CSS hex string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Color*](README.md#color) | RGB values.    |

**Returns:** [*Hex*](README.md#hex)

CSS hex string.

Defined in: [toHex/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/toHex/index.ts#L10)

___

### toHsl

▸ **toHsl**(`__namedParameters`: [*Color*](README.md#color)): [*Hsl*](interfaces/hsl.md)

Convert the intermediate format to a HSL color

**`see`** https://www.w3.org/TR/css-color-4/#hsl-to-rgb

#### Parameters:

• **__namedParameters**: [*Color*](README.md#color)

**Returns:** [*Hsl*](interfaces/hsl.md)

HSLA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]

Defined in: [toHsl/index.ts:12](https://github.com/ajlende/color-fns/blob/59a932e/src/toHsl/index.ts#L12)

___

### toHslString

▸ **toHslString**(`color`: [*Color*](README.md#color)): [*HslString*](README.md#hslstring)

Convert a color to a CSS RGB string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Color*](README.md#color) | Input color to convert    |

**Returns:** [*HslString*](README.md#hslstring)

Color converted to HslString

Defined in: [toHslString/index.ts:11](https://github.com/ajlende/color-fns/blob/59a932e/src/toHslString/index.ts#L11)

___

### toRgb

▸ **toRgb**(`color`: [*Color*](README.md#color)): [*Rgb*](interfaces/rgb.md)

Convert a color to an Rgb.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Color*](README.md#color) | Input color to convert    |

**Returns:** [*Rgb*](interfaces/rgb.md)

Color converted to Rgb

Defined in: [toRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/toRgb/index.ts#L10)

___

### toRgbString

▸ **toRgbString**(`color`: [*Color*](README.md#color)): [*RgbString*](README.md#rgbstring)

Convert a color to a CSS RGB string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Color*](README.md#color) | Input color to convert    |

**Returns:** [*RgbString*](README.md#rgbstring)

Color converted to RgbString

Defined in: [toRgbString/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/toRgbString/index.ts#L10)

___

### toVec4

▸ **toVec4**(`color`: [*Color*](README.md#color)): [*Vec4*](README.md#vec4)

Convert a color to a Vec4.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`color` | [*Color*](README.md#color) | Input color to convert    |

**Returns:** [*Vec4*](README.md#vec4)

Color converted to Vec4

Defined in: [toVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/59a932e/src/toVec4/index.ts#L10)
