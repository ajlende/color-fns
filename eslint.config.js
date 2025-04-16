// @ts-check

import { fileURLToPath, URL } from "node:url"

import eslint from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import ava from "eslint-plugin-ava"
import prettier from "eslint-config-prettier/flat"
import tseslint from "typescript-eslint"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

export default tseslint.config(
	includeIgnoreFile(gitignorePath),
	eslint.configs.recommended,
	tseslint.configs.recommended,
	ava.configs["flat/recommended"],
	prettier,
)
