[color-fns - v0.1.0](../README.md) / Parser

# Interface: Parser<T\>

TODO: Think of a better name. This contains a function to test if a value is
of a given type and then convert that type to the intermediate format.

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **Parser**

## Table of contents

### Properties

- [fromType](parser.md#fromtype)
- [isType](parser.md#istype)

## Properties

### fromType

• **fromType**: (`color`: T) => [*Vec4*](../README.md#vec4)

Convert from the type T to the intermediate format.

Defined in: [types.ts:168](https://github.com/ajlende/color-fns/blob/32c4ed2/src/types.ts#L168)

___

### isType

• **isType**: (`color`: *unknown*) => color is T

Check to see if the type of the input is T so it can be converted later.

Defined in: [types.ts:164](https://github.com/ajlende/color-fns/blob/32c4ed2/src/types.ts#L164)
