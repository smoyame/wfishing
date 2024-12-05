import pluginWebc from "@11ty/eleventy-plugin-webc"

export default function (eleventyConfig) {
	eleventyConfig.ignores.add("./src/__typescript")
	eleventyConfig.addPassthroughCopy("./src/static")
	eleventyConfig.addPlugin(pluginWebc, {
		components: "src/components/*.webc"
	})

	return {
		dir: {
			input: "./src",
			output: "./dist"
		},
		templateFormats: ["webc"]
	};
};

