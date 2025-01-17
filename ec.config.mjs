// @ts-check
import darkTheme from "solarflare-theme/themes/cloudflare-dark-color-theme.json" with { type: "json" };
import lightTheme from "solarflare-theme/themes/cloudflare-light-color-theme.json" with { type: "json" };

import { definePlugin } from "@expressive-code/core";
import { h } from "@expressive-code/core/hast";

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

import lzstring from "lz-string";

/**
 * @param {string} code
 */
export function serialiseWorker(code) {
	const formData = new FormData();

	const metadata = {
		main_module: "index.js",
	};

	formData.set(
		"index.js",
		new Blob([code], {
			type: "application/javascript+module",
		}),
		"index.js",
	);

	formData.set(
		"metadata",
		new Blob([JSON.stringify(metadata)], { type: "application/json" }),
	);

	return formData;
}

/**
 * @param {FormData} worker
 */
export async function compressWorker(worker) {
	const serialisedWorker = new Response(worker);
	return lzstring.compressToEncodedURIComponent(
		`${serialisedWorker.headers.get(
			"content-type",
		)}:${await serialisedWorker.text()}`,
	);
}

function workersPlaygroundButton() {
	return definePlugin({
		name: "Adds 'Run Worker' button to JS codeblocks",
		baseStyles: `
        .run {
            display: flex;
            gap: 0.25rem;
            flex-direction: row;
            position: absolute;
            inset-block-start: calc(var(--ec-brdWd) + var(--button-spacing));
            inset-inline-end: calc(var(--ec-brdWd) + var(--ec-uiPadInl) * 3);
            direction: ltr;
            unicode-bidi: isolate;

            text-decoration-color: var(--sl-color-accent);
            span {
                color: var(--sl-color-white);
                font-family: var(--sl-font-system);
            }
        }
        `,
		hooks: {
			postprocessRenderedBlock: async (context) => {
				if (!context.codeBlock.meta.includes("playground")) return;

				const serialised = await compressWorker(
					serialiseWorker(context.codeBlock.code),
				);

				const url = `https://workers.cloudflare.com/playground#${serialised}`;

				const runButton = h("a.run", { href: url, target: "__blank" }, [
					h("span", "Run Worker in Playground"),
				]);

				const ast = context.renderData.blockAst;
				ast.children.push(runButton);

				context.renderData.blockAst = ast;
			},
		},
	});
}

function outputCodeblocks() {
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
}

function defaultLanguageTitles() {
	return definePlugin({
		name: "Adds language-specific default titles.",
		hooks: {
			preprocessLanguage: async (context) => {
				switch (context.codeBlock.language) {
					case "powershell": {
						context.codeBlock.props.title ??= "PowerShell";
						break;
					}
					default: {
						return;
					}
				}
			},
		},
	});
}

export default {
	plugins: [
		workersPlaygroundButton(),
		outputCodeblocks(),
		defaultLanguageTitles(),
		pluginCollapsibleSections(),
	],
	themes: [darkTheme, lightTheme],
	styleOverrides: {
		textMarkers: {
			defaultLuminance: ["32%", "88%"],
		},
	},
	frames: {
		extractFileNameFromCode: false,
	},
};
