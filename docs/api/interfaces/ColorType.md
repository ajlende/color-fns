[color-fns - v0.1.0](../README.md) / ColorType

# Interface: ColorType<T\>

TODO: Think of a better name. This contains a function to test if a value is
of a given type and then convert that type to the intermediate format.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [fromType](ColorType.md#fromtype)
- [isType](ColorType.md#istype)

## Properties

### fromType

• **fromType**: (`color`: `T`) => [`Vec4`](../README.md#vec4)

#### Type declaration

▸ (`color`): [`Vec4`](../README.md#vec4)

Convert from the type T to the intermediate format.

##### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `T` |

##### Returns

[`Vec4`](../README.md#vec4)

#### Defined in

[types.ts:168](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L168)

___

### isType

• **isType**: (`color`: `unknown`) => color is T

#### Type declaration

▸ (`color`): color is T

Check to see if the type of the input is T so it can be converted later.

##### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `unknown` |

##### Returns

color is T

#### Defined in

[types.ts:164](https://github.com/ajlende/color-fns/blob/586d81e/src/types.ts#L164)
