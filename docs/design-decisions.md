# Design Decisions

## Internal color format

The intermediary color format is stored as a `Vec4` or rather an array of numbers representing \[ `red`, `green`, `blue`, `alpha` ]. A color in the sRGB color space will have `red`, `green`, and `blue` numbers in the range \[0,1], but colors in larger color spaces like CIELAB may have numbers outside that range. `alpha` will always be in the range \[0,1].

- Most final output formats will be some representation of RGB, so that is most convenient.
- This is the most memory efficient packing for colors, and is the fastest for accessing values.
- Convenient for shipping to WebGL.
- Unfortunately, in some cases in order to do color operations we have to convert to a different intermediary first. For example rotating the hue of a color has to be done in HSL space.

[colr-convert] does direct conversions between things, so maybe that approach could be better for speed for the special cases they cover.

[colr-convert]: https://github.com/stayradiated/colr/blob/master/index.js

## CSS Color Strings

Color strings in CSS can be quite complicated—even something as simple as a number has rules for `+` or `-` signs and exponent `e` or `E` in the spec. Matching the CSS spec exactly pretty much requires proper tokenization and parsing, so for the sake of this library, I'm keeping the parsing to something that can be handled with (what I consider to be) a readable regular expression. This means that some technically valid, yet uncommon use-cases may result in errors. Fortunately if a more specific parser is required for your use-case, you can write your own and successfully plug it in to handle those edge cases.

## Errors

Parsing colors has a lot of opportunity for a wide variety of errors. I've always found the try/catch mechanism really clunky so there are a couple other options: returning the error or returning null. I like how `Maybe` works in other languages, but in TypeScript it requires an awkward switch/case or if/else _and_ an awkward object wrapper.

After considering the options, I think I'm still going to go with the try/catch. It's not worth confusing people over a negligible performance increase (performance-critical applications should use [colr-convert]) and slightly more condensed code (see examples below).

### Returning `null` instead of throwing

You can still get the convenient `null` behavior if you don't care about error types by wrapping calls in an error handling function.

[neverthrow]: https://github.com/supermacro/neverthrow

```tsx
import { fromAny as _fromAny } from "color-fns"

function fromThrowable(f, asNull) {
	return (...args) => {
		try {
			return f(...args)
		} catch (e) {
			return asNull ? null : e
		}
	}
}

const fromAny = fromThrowable(_fromAny, true)
```

### Using a library like `neverthrow`

The same method can be used for converting to a library like [neverthrow].

```tsx
import { Result } from "neverthrow"
import { fromAny as _fromAny } from "color-fns"

type ParseError = { message: string }
const toParseError = (): ParseError => ({ message: "Parse Error" })
const fromAny = Result.fromThrowable(_fromAny, toParseError)
```

### example using `throw`

Pros: This is how `date-fns` handles errors. Probably how most people expect errors to be handled.

Cons: Ugly, takes up a lot of space, need to use a `let`. Maybe marginally slower performance.

```tsx
function MyComponent() {
	const colorRef = useRef()

	let rgb
	try {
		rgb = convert(fromHex, toRGB, colorRef.current.value)
	} catch (e) {
		rgb = "Could not convert"
	}

	return (
		<div>
			<label>
				Color:
				<input type="text" ref={colorRef} />
			</label>
			<span>As RGB: {rgb}</span>
		</div>
	)
}
```

### example using `return null`

Pros: Very convenient with the `??` operator.

Cons: No error type available to see why the error happened.

```tsx
function MyComponent() {
	const colorRef = useRef()

	const rgb = convert(fromHex, toRGB, colorRef.current.value) ?? ""

	return (
		<div>
			<label>
				Color:
				<input type="text" ref={colorRef} />
			</label>
			<span>As RGB: {rgb}</span>
		</div>
	)
}
```

### example using `return Error`

Pros: Ternary is still pretty convenient, and also still have error messages.

Cons: Less convenient than using `null`, don't think I've ever seen a library use this method.

```tsx
function MyComponent() {
	const colorRef = useRef()

	const converted = convert(fromHex, toRGB, colorRef.current.value)
	const rgb = converted instanceof RangeError ? "Could not convert" : converted

	return (
		<div>
			<label>
				Color:
				<input type="text" ref={colorRef} />
			</label>
			<span>As RGB: {rgb}</span>
		</div>
	)
}
```
