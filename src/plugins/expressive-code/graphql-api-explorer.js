// @ts-check
import { definePlugin } from "@expressive-code/core";

import lzstring from "lz-string";

/**
 * @param {string} gql
 */
async function compressGql(gql) {
	return lzstring.compressToEncodedURIComponent(gql);
}

/**
 * See https://developers.cloudflare.com/style-guide/contributions/ for instructions on how to use this plugin.
 * @param {string} query
 */
function autoPopulateGraphQLVariables(query) {
	const varPattern = /\$(\w+):\s*([\w![\]]+)/g;
	const now = new Date();
	/** @type {Record<string, any>} */
	const variables = {};
	let match;

	while ((match = varPattern.exec(query)) !== null) {
		const [, varName, varTypeRaw] = match;

		const varType = varTypeRaw.replace(/[![\]]/g, "");

		// Type- and name-based inference
		if (varType === "Time") {
			const value = /start/i.test(varName)
				? new Date(now.getTime() - 6 * 60 * 60 * 1000)
				: now;
			variables[varName] = value.toISOString().split(".")[0] + "Z";
		} else if (varType === "Date") {
			const value = /start/i.test(varName)
				? new Date(now.getTime() - 24 * 60 * 60 * 1000)
				: now;
			variables[varName] = value.toISOString().split("T")[0]; // e.g., "2025-05-05"
		} else if (varType.toLowerCase() === "string") {
			if (/zoneTag/i.test(varName)) {
				variables[varName] = "ZONE_ID";
			} else if (/accountTag/i.test(varName)) {
				variables[varName] = "ACCOUNT_ID";
			} else if (/id/i.test(varName)) {
				variables[varName] = "REPLACE_WITH_ID";
			} else {
				variables[varName] = "REPLACE_WITH_STRING";
			}
		} else if (varType.indexOf("int") > -1) {
			if (/limit/i.test(varName)) {
				variables[varName] = 100;
			}
		}
	}

	return variables;
}

export default () => {
	return definePlugin({
		name: "Adds 'Run in GraphQL API Explorer' button to GraphQL codeblocks",
		baseStyles: `
		.wrapper {
			box-shadow: var(--ec-frm-frameBoxShdCssVal);
			border-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
			margin-top: 0 !important;
		}

		.expressive-code:has(.gql-explorer-frame) .frame {
		  box-shadow: unset;

			& > pre {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}

		.gql-explorer-frame {
			border: var(--ec-brdWd) solid var(--ec-brdCol);
			border-top: unset;
			border-bottom-left-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
			border-bottom-right-radius: calc(var(--ec-brdRad) + var(--ec-brdWd));
		}`,
		hooks: {
			postprocessRenderedBlock: async (context) => {
				if (
					!context.codeBlock.meta.includes("graphql-api-explorer") &&
					!context.codeBlock.meta.includes("graphql")
				)
					return;

				let transformedVariables = autoPopulateGraphQLVariables(
					context.codeBlock.code,
				);
				transformedVariables = {
					...transformedVariables,
					...JSON.parse(
						context.codeBlock.metaOptions.getString("graphql-api-explorer") ??
							"{}",
					),
				};

				const query = await compressGql(context.codeBlock.code);
				const variables = await compressGql(
					JSON.stringify(transformedVariables),
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
									"gql-explorer-frame",
									"flex!",
									"p-4!",
									"justify-end!",
									"items-center!",
								],
							},
							children: [
								{
									type: "element",
									tagName: "a",
									properties: {
										className: [
											"bg-cl1-brand-orange!",
											"rounded-sm!",
											"px-6!",
											"py-2!",
											"text-cl1-black!",
											"font-medium!",
											"no-underline!",
										],
										href: `https://graphql.cloudflare.com/explorer?query=${query}&variables=${variables}`,
										target: "_blank",
									},
									children: [
										{ type: "text", value: "Run in GraphQL API Explorer" },
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
