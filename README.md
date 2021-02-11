# color-fns

**⚠︎⚠︎⚠︎This project is still in early development. Expect breaking changes frequently at this stage.⚠︎⚠︎⚠︎**

It's like [date-fns](https://date-fns.org) for colors.

- **Zero Dependencies**: No useless bloat. No additional code to audit.
- **Modular**: Pick what you need. Supports tree-shaking.
- **Immutable & Pure**: Makes your code easier to read and understand.
- **TypeScript**: Prevent runtime type-related errors.

```js
import { convert, fromAny, toHex } from "color-fns"

convert(fromAny, toHex, [0.2, 0.4, 0.6, 1])
//=> "#336699"
```

## License

[MIT © Alex Lende](https://tldrlegal.com/license/mit-license)
