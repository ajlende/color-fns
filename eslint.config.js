// @ts-check

import { fileURLToPath, URL } from "node:url"

import { includeIgnoreFile } from "@eslint/compat"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintPluginAva from "eslint-plugin-ava"
import tseslint from "typescript-eslint"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

export default tseslint.config(
	includeIgnoreFile(gitignorePath),
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/restrict-template-expressions": "off",
		},
	},
	{
		files: ["src/**/*"],
		rules: { "no-console": "error" },
	},
	{
		files: ["*.js", "scripts/*.js"],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		files: ["src/**/*.test.ts", "src/_test-utils.ts"],
		extends: [eslintPluginAva.configs["flat/recommended"]],
		rules: {
			"no-console": "warn",
		},
	},
	eslintConfigPrettier,
)
