/* eslint-env node */

module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:ava/recommended",
		"plugin:@typescript-eslint/recommended",
		// More config is required before enabling this
		// "plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:prettier/recommended",
		"prettier/@typescript-eslint",
	],
}
