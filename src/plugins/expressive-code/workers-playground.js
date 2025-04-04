// @ts-check
import { definePlugin } from "@expressive-code/core";

import lzstring from "lz-string";

/**
 * @param {string} code
 */
function serialiseWorker(code) {
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
async function compressWorker(worker) {
	const serialisedWorker = new Response(worker);
	return lzstring.compressToEncodedURIComponent(
		`${serialisedWorker.headers.get(
			"content-type",
		)}:${await serialisedWorker.text()}`,
	);
}

export default () => {
	return definePlugin({
		name: "Adds 'Run Worker' button to JS codeblocks",
		baseStyles: `
		.wrapper {
			box-shadow: var(--ec-frm-frameBoxShdCssVal);
			border-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
			margin-top: 0 !important;
		}

		.expressive-code:has(.playground-frame) .frame {
		  box-shadow: unset;

			& > pre {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		.playground-frame {
			border: var(--ec-brdWd) solid var(--ec-brdCol);
			border-top: unset;
			border-bottom-left-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
			border-bottom-right-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
		}`,
		hooks: {
			postprocessRenderedBlock: async (context) => {
				if (!context.codeBlock.meta.includes("playground")) return;

				const serialised = await compressWorker(
					serialiseWorker(context.codeBlock.code),
				);

				context.renderData.blockAst = {
					type: "element",
					tagName: "div",
					properties: {
						className: ["wrapper"],
					},
					children: [
						context.renderData.blockAst,
						{
							type: "element",
							tagName: "div",
							properties: {
								className: [
									"playground-frame",
									"!flex",
									"!p-4",
									"!justify-end",
									"!items-center",
								],
							},
							children: [
								{
									type: "element",
									tagName: "a",
									properties: {
										className: [
											"!bg-cl1-brand-orange",
											"!rounded",
											"!px-6",
											"!py-2",
											"!text-cl1-black",
											"!font-medium",
											"!no-underline",
										],
										href: `https://workers.cloudflare.com/playground#${serialised}`,
										target: "_blank",
									},
									children: [
										{ type: "text", value: "Run Worker in Playground" },
									],
								},
							],
						},
					],
				};
			},
		},
	});
};
