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

- [parse](parser.md#parse)
- [test](parser.md#test)

## Properties

### parse

• **parse**: (`color`: T) => [*Vec4*](../README.md#vec4)

Convert from the type T to the intermediate format.

Defined in: [types.ts:168](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L168)

___

### test

• **test**: (`color`: *unknown*) => color is T

Check to see if the type of the input is T so it can be converted later.

Defined in: [types.ts:164](https://github.com/ajlende/color-fns/blob/59a932e/src/types.ts#L164)
