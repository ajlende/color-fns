// @ts-check

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { join, relative, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, "..")
const srcDir = join(rootDir, "src")
const packageJsonPath = join(rootDir, "package.json")

const exports = {
	".": {
		import: "./dist/index.js",
		types: "./dist/index.d.ts",
	},
}

const directories = readdirSync(srcDir, {
	withFileTypes: true,
	recursive: true,
})

for (const dir of directories) {
	if (!dir.isDirectory()) continue

	const dirPath = join(dir.parentPath, dir.name)
	const relativePath = relative(srcDir, dirPath)

	if (existsSync(join(dirPath, "index.js"))) {
		exports[`./${relativePath}`] = {
			import: `./dist/${relativePath}/index.js`,
			types: `./dist/${relativePath}/index.d.ts`,
		}
	}

	exports[`./${relativePath}/*.js`] = {
		import: `./dist/${relativePath}/*.js`,
		types: `./dist/${relativePath}/*.d.ts`,
	}
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"))
packageJson.exports = exports

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "\t") + "\n")

console.log("Exports generated")
