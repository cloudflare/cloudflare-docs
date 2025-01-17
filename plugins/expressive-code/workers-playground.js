import { definePlugin } from "@expressive-code/core";
import { h } from "@expressive-code/core/hast";

import lzstring from "lz-string";

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

export async function compressWorker(worker) {
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
};
