// @ts-check

/** @type {import('lint-staged').Configuration} */
export default {
	"*.{js,ts}": ["eslint --fix", "prettier --write --ignore-unknown"],
	"*.{json,md}": ["prettier --write --ignore-unknown"],
}
