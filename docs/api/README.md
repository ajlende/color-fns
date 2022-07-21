color-fns - v0.1.0

# color-fns - v0.1.0

## Table of contents

### Interfaces

- [ColorType](interfaces/ColorType.md)
- [Hsl](interfaces/Hsl.md)
- [Hsv](interfaces/Hsv.md)
- [Rgb](interfaces/Rgb.md)

### Type Aliases

- [Color](README.md#color)
- [ExtractColorTypes](README.md#extractcolortypes)
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
- [fromList](README.md#fromlist)
- [fromRgb](README.md#fromrgb)
- [fromRgbString](README.md#fromrgbstring)
- [fromVec4](README.md#fromvec4)
- [isHex](README.md#ishex)
- [isHsl](README.md#ishsl)
- [isHslString](README.md#ishslstring)
- [isRgb](README.md#isrgb)
- [isRgbString](README.md#isrgbstring)
- [isVec4](README.md#isvec4)
- [toHex](README.md#tohex)
- [toHsl](README.md#tohsl)
- [toHslString](README.md#tohslstring)
- [toRgb](README.md#torgb)
- [toRgbString](README.md#torgbstring)
- [toVec4](README.md#tovec4)

## Type Aliases

### Color

Ƭ **Color**: [`Vec4`](README.md#vec4)

Internal color representation. Stored as a [Vec4](README.md#vec4).

#### Defined in

[types.ts:8](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L8)

___

### ExtractColorTypes

Ƭ **ExtractColorTypes**<`T`\>: { [K in keyof T]: T[K] extends ColorType<infer R\> ? R : unknown }

Utility type to help with type checking the [fromAny](README.md#fromany) and related
functions for converting from multiple types.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:186](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L186)

___

### Hex

Ƭ **Hex**: `string`

Hexadecimal string preceded by a '#' as used in CSS.

**`Example`**

```
const hex3: Hex = "#369"      // 3-digit
const hex6: Hex = "#336699"   // 6-digit
const hex4: Hex = "#369c"     // 4-digit (with alpha)
const hex8: Hex = "#336699cc" // 8-digit (with alpha)
```

#### Defined in

[types.ts:31](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L31)

___

### HslString

Ƭ **HslString**: `string`

HSL string as used in CSS.

**`Example`**

```
const hsl: HslString = "hsl(210, 50%, 40%)"
const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
```

#### Defined in

[types.ts:74](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L74)

___

### NonemptyReadonlyArray

Ƭ **NonemptyReadonlyArray**<`T`\>: `ReadonlyArray`<`T`\> & { `0`: `T`  }

Readonly array with at least one element.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:178](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L178)

___

### RgbString

Ƭ **RgbString**: `string`

RGB string as used in CSS.

**`Example`**

```
const hsl: HslString = "hsl(210, 50%, 40%)"
const hsla: HslString = "hsla(210, 50%, 40%, 0.8)"
```

#### Defined in

[types.ts:117](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L117)

___

### Vec4

Ƭ **Vec4**: [`number`, `number`, `number`, `number`]

Array of sRGB [red, green, blue, alpha] values in the range [0,1].

**`Example`**

```
const color: Vec4 = [0.2, 0.4, 0.6, 0.8]
```

#### Defined in

[types.ts:18](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L18)

## Functions

### convert

▸ **convert**<`T`, `U`\>(`fromFn`, `toFn`, `color`): `U`

Convert a color from one representation to another.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromFn` | (`x`: `T`) => [`Vec4`](README.md#vec4) | Function to convert from |
| `toFn` | (`x`: [`Vec4`](README.md#vec4)) => `U` | Function to convert to |
| `color` | `T` | Input color to convert |

#### Returns

`U`

Converted color

#### Defined in

[convert/index.ts:12](https://github.com/ajlende/color-fns/blob/586d81e/src/convert/index.ts#L12)

___

### fromAny

▸ **fromAny**(`color`): [`Color`](README.md#color)

Convert a color from any available parser.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `string` \| [`Vec4`](README.md#vec4) \| [`Hsl`](interfaces/Hsl.md) \| [`Rgb`](interfaces/Rgb.md) | Any type of color that can be converted |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromAny/index.ts:48](https://github.com/ajlende/color-fns/blob/586d81e/src/fromAny/index.ts#L48)

___

### fromHex

▸ **fromHex**(`color`): [`Color`](README.md#color)

Convert a hex string to a Color

**`See`**

https://www.w3.org/TR/css-color-4/#hex-notation

**`Throws`**

Thrown if the input string is not a valid hex format

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `string` |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromHex/index.ts:15](https://github.com/ajlende/color-fns/blob/586d81e/src/fromHex/index.ts#L15)

___

### fromHsl

▸ **fromHsl**(`color`): [`Color`](README.md#color)

Convert a HSL color to the intermediate format

**`See`**

https://www.w3.org/TR/css-color-4/#hsl-to-rgb

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Hsl`](interfaces/Hsl.md) | HSLA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1] |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromHsl/index.ts:31](https://github.com/ajlende/color-fns/blob/586d81e/src/fromHsl/index.ts#L31)

___

### fromHslString

▸ **fromHslString**(`color`): [`Color`](README.md#color)

Convert `hsl()` or `hsla()` to the intermediary Color format

**`See`**

https://www.w3.org/TR/css-color-4/#the-hsl-notation

**`Throws`**

Thrown if the input string is not a valid `hsl()` format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `string` | `hsl()` or `hsla()` string |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromHslString/index.ts:19](https://github.com/ajlende/color-fns/blob/586d81e/src/fromHslString/index.ts#L19)

___

### fromList

▸ **fromList**<`R`, `T`\>(`colorTypes`, `color`): [`Color`](README.md#color)

Parse a color from a static list of available parsers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends readonly [`ColorType`](interfaces/ColorType.md)<`any`\>[] & { `0`: [`ColorType`](interfaces/ColorType.md)<`any`\>  } |
| `T` | extends [`ExtractColorTypes`](README.md#extractcolortypes)<`R`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `colorTypes` | `R` | - |
| `color` | `T`[`number`] | Any type of color that can be converted |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromList/index.ts:15](https://github.com/ajlende/color-fns/blob/586d81e/src/fromList/index.ts#L15)

___

### fromRgb

▸ **fromRgb**(`color`): [`Color`](README.md#color)

Convert a color from an Rgb.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Rgb`](interfaces/Rgb.md) | Input color to convert |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/fromRgb/index.ts#L10)

___

### fromRgbString

▸ **fromRgbString**(`color`): [`Color`](README.md#color)

Convert simple RGB strings to the intermediary Color format

**`Throws`**

Thrown if the input string is not a valid simple RGB format

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `string` | Simple RGB string |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromRgbString/index.ts:16](https://github.com/ajlende/color-fns/blob/586d81e/src/fromRgbString/index.ts#L16)

___

### fromVec4

▸ **fromVec4**(`color`): [`Color`](README.md#color)

Convert a color from a Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Input color to convert |

#### Returns

[`Color`](README.md#color)

Color in the intermediary format

#### Defined in

[fromVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/fromVec4/index.ts#L10)

___

### isHex

▸ **isHex**(`color`): color is string

Test if the given color is a Hex color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being a Hex color |

#### Returns

color is string

True if the color is a Hex color

#### Defined in

[isHex/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/isHex/index.ts#L10)

___

### isHsl

▸ **isHsl**(`color`): color is Hsl

Test if the given color is a Hsl color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being a Hsl color |

#### Returns

color is Hsl

True if the color is a Hsl color

#### Defined in

[isHsl/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/isHsl/index.ts#L10)

___

### isHslString

▸ **isHslString**(`color`): color is string

Test if the given color is an HSL string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being an HSL string |

#### Returns

color is string

True if the color is an HSL string

#### Defined in

[isHslString/index.ts:17](https://github.com/ajlende/color-fns/blob/586d81e/src/isHslString/index.ts#L17)

___

### isRgb

▸ **isRgb**(`color`): color is Rgb

Test if the given color is a Rgb color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being an Rgb color |

#### Returns

color is Rgb

True if the color is an Rgb color

#### Defined in

[isRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/isRgb/index.ts#L10)

___

### isRgbString

▸ **isRgbString**(`color`): color is string

Test if the given color is an RGB string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being an RGB string |

#### Returns

color is string

True if the color is an RGB string

#### Defined in

[isRgbString/index.ts:16](https://github.com/ajlende/color-fns/blob/586d81e/src/isRgbString/index.ts#L16)

___

### isVec4

▸ **isVec4**(`color`): color is Vec4

Test if the given color is a Vec4 color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `unknown` | Color to test for being a Vec4 color |

#### Returns

color is Vec4

True if the color is a Vec4 color

#### Defined in

[isVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/isVec4/index.ts#L10)

___

### toHex

▸ **toHex**(`color`): [`Hex`](README.md#hex)

Convert an RGB object to a CSS hex string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | RGB values. |

#### Returns

[`Hex`](README.md#hex)

CSS hex string.

#### Defined in

[toHex/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/toHex/index.ts#L10)

___

### toHsl

▸ **toHsl**(`color`): [`Hsl`](interfaces/Hsl.md)

Convert the intermediate format to a HSL color

**`See`**

https://www.w3.org/TR/css-color-4/#hsl-to-rgb

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Color in the intermediary format |

#### Returns

[`Hsl`](interfaces/Hsl.md)

HSLA object. Hue in degrees, saturation, lightness, alpha as percentage [0,1]

#### Defined in

[toHsl/index.ts:12](https://github.com/ajlende/color-fns/blob/586d81e/src/toHsl/index.ts#L12)

___

### toHslString

▸ **toHslString**(`color`): [`HslString`](README.md#hslstring)

Convert a color to a CSS RGB string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Input color to convert |

#### Returns

[`HslString`](README.md#hslstring)

Color converted to HslString

#### Defined in

[toHslString/index.ts:11](https://github.com/ajlende/color-fns/blob/586d81e/src/toHslString/index.ts#L11)

___

### toRgb

▸ **toRgb**(`color`): [`Rgb`](interfaces/Rgb.md)

Convert a color to an Rgb.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Input color to convert |

#### Returns

[`Rgb`](interfaces/Rgb.md)

Color converted to Rgb

#### Defined in

[toRgb/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/toRgb/index.ts#L10)

___

### toRgbString

▸ **toRgbString**(`color`): [`RgbString`](README.md#rgbstring)

Convert a color to a CSS RGB string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Input color to convert |

#### Returns

[`RgbString`](README.md#rgbstring)

Color converted to RgbString

#### Defined in

[toRgbString/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/toRgbString/index.ts#L10)

___

### toVec4

▸ **toVec4**(`color`): [`Vec4`](README.md#vec4)

Convert a color to a Vec4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | [`Vec4`](README.md#vec4) | Input color to convert |

#### Returns

[`Vec4`](README.md#vec4)

Color converted to Vec4

#### Defined in

[toVec4/index.ts:10](https://github.com/ajlende/color-fns/blob/586d81e/src/toVec4/index.ts#L10)
