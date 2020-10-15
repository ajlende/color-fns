/* eslint-env node */

module.exports = {
	extends: "@istanbuljs/nyc-config-typescript",
	reporter: process.env.CI === "true" ? ["lcov"] : ["text"],
	all: true,
	include: ["src/**/*.ts"],
	exclude: ["**/*.test.ts"],
}
