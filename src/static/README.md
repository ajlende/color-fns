# Static pipe

```ts
import {rgbToHsl, hslToHsv} from "fncolor"

const rgbToHsv = pipe(rgbToHsl, hslToHsv)
const hsv = rgbToHsv({ r: 0.5, g: 0.5, b: 0.5 })
```
