import { definePlugin } from "@expressive-code/core";

export default () => {
	return definePlugin({
		name: "Adds the '.code-output' class if 'output' is passed on the opening codefence.",
		hooks: {
			preprocessMetadata: async (context) => {
				if (!context.codeBlock.meta.includes("output")) return;

				context.codeBlock.props.frame = "none";
			},
			postprocessRenderedBlock: async (context) => {
				if (!context.codeBlock.meta.includes("output")) return;
				context.renderData.blockAst.properties.className ??= [];
				if (Array.isArray(context.renderData.blockAst.properties.className)) {
					context.renderData.blockAst.properties.className.push("code-output");
				}
				context.addStyles(`
					div.expressive-code:has(figure.code-output) {
						margin-top: 0 !important;
					}

					.code-output .copy {
						display: none !important;
					}

					.code-output > pre {
						border-top-width: 0 !important;
						background: var(--sl-color-gray-6) !important;
					}

					.code-output > pre > code {
						user-select: none;
						transition: opacity 0.5s ease;
					}

					.code-output > pre > code:hover {
						cursor: default;
						opacity: 0.5;
					}
				`);
			},
		},
	});
};
