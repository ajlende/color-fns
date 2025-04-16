// @ts-check

/** @type {Partial<import("typedoc").TypeDocOptions>} */
export default {
	entryPoints: ["src/index.ts"],
	plugin: ["typedoc-plugin-markdown"],
	out: "docs/md",
	readme: "none",
	includeVersion: true,
}
