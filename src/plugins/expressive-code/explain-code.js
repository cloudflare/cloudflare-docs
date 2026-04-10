// @ts-check
import { definePlugin } from "@expressive-code/core";
import { h } from "@expressive-code/core/hast";

export default () => {
	return definePlugin({
		name: "Adds 'Explain Code' button to code blocks with 10+ lines",
		baseStyles: `
			/*
				This is normally set to 2.5rem if the user is unable to hover (i.e mobile)
				and 2rem otherwise, we would like it to always be 2rem.
			*/
			.expressive-code .copy button {
				width: 2rem !important;
				height: 2rem !important;
			}

			.expressive-code .explain {
				display: flex;
				gap: 0.25rem;
				flex-direction: row;
				position: absolute;
				inset-block-start: calc(var(--ec-brdWd) + var(--button-spacing));
				inset-inline-end: calc(var(--ec-brdWd) + var(--ec-uiPadInl) / 2);

				/* RTL support: Code is always LTR, so the inline button must match */
				direction: ltr;
				unicode-bidi: isolate;

				@media (scripting: none) {
					display: none;
				}
			}

			.expressive-code .frame:has(.explain) .copy {
				/* Move left by (explain button width + gap) */
				inset-inline-end: calc(var(--ec-brdWd) + var(--ec-uiPadInl) / 2 + 2rem + 0.5rem);
			}

			.expressive-code .explain button {
				position: relative;
				align-self: flex-end;
				z-index: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 2rem;
				height: 2rem;
				padding: 0;
				margin: 0;
				border: none;
				border-radius: 0.2rem;
				background: var(--code-background);
				color: var(--ec-frm-inlBtnFg);
				cursor: pointer;
				transition-property: opacity, background, border-color;
				transition-duration: 0.2s;
				transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
				opacity: 0.75;
			}

			.expressive-code .explain button::before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background: var(--ec-frm-inlBtnBg);
				opacity: var(--ec-frm-inlBtnBgIdleOpa);
				transition-property: inherit;
				transition-duration: inherit;
				transition-timing-function: inherit;
			}

			.expressive-code .explain button::after {
				content: '';
				position: absolute;
				pointer-events: none;
				inset: 0;
				border-radius: inherit;
				border: var(--ec-brdWd) solid var(--ec-frm-inlBtnBrd);
				opacity: var(--ec-frm-inlBtnBrdOpa);
			}

			.expressive-code .explain button svg {
				width: 1rem;
				height: 1rem;
				position: relative;
				z-index: 1;
			}

			.expressive-code .explain button:hover::before,
			.expressive-code .explain button:focus:focus-visible::before {
				opacity: var(--ec-frm-inlBtnBgHoverOrFocusOpa);
			}

			.expressive-code .explain button:active, .expressive-code .explain button:hover {
				opacity: 1;
			}

			.expressive-code .explain button:active::before {
				opacity: var(--ec-frm-inlBtnBgActOpa);
			}

			.expressive-code .explain button:focus-visible {
				outline: 2px solid var(--ec-focusBrd);
				outline-offset: 2px;
			}

			.expressive-code .explain-tooltip {
				pointer-events: none;
				user-select: none;
				-webkit-user-select: none;
				position: absolute;
				bottom: calc(100% + 0.25rem);
				left: 50%;
				transform: translateX(-50%);
				z-index: 100;
				padding: 2px 7px;
				line-height: 1;
				border-radius: 0.2rem;
				opacity: 0;
				transition-property: opacity, transform;
				transition-duration: 0.2s;
				transition-timing-function: ease-in-out;
				font-size: 0.7rem;
				line-height: 1.65;
				white-space: nowrap;
			}

			@media (prefers-color-scheme: light) {
				.expressive-code .explain-tooltip {
					color: #4e4e4e;
					background-color: #e4e4e4;
					border: 1px solid #c4c4c4;
				}
			}

			@media (prefers-color-scheme: dark) {
				.expressive-code .explain-tooltip {
					color: #e6e6e6;
					background-color: #282828;
					border: 1px solid #4e4f4f;
				}
			}

			.expressive-code .explain button:hover .explain-tooltip {
				opacity: 1;
			}
		`,
		hooks: {
			postprocessRenderedBlock: async (context) => {
				const lineCount = context.codeBlock.code.split("\n").length;

				if (lineCount < 10) return;

				const blockAst = /** @type {import("hast").Element} */ (
					context.renderData.blockAst
				);

				// Expressive Code frames plugin is required for explain button to work correctly. Ignore if it's not present.
				if (
					blockAst.tagName !== "figure" ||
					!Array.isArray(blockAst.properties?.className) ||
					!blockAst.properties.className.includes("frame")
				) {
					return;
				}

				/** @type {import("hast").Element} */
				const explainButton = {
					type: "element",
					tagName: "button",
					properties: {
						className: ["explain-button"],
						type: "button",
						"data-explain-code": "",
						"aria-label": "Explain Code",
					},
					children: [
						{
							type: "element",
							tagName: "svg",
							properties: {
								xmlns: "http://www.w3.org/2000/svg",
								width: "24",
								height: "24",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
							},
							children: [
								{
									type: "element",
									tagName: "path",
									properties: {
										d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
									},
									children: [],
								},
								{
									type: "element",
									tagName: "path",
									properties: { d: "M20 3v4" },
									children: [],
								},
								{
									type: "element",
									tagName: "path",
									properties: { d: "M22 5h-4" },
									children: [],
								},
								{
									type: "element",
									tagName: "path",
									properties: { d: "M4 17v2" },
									children: [],
								},
								{
									type: "element",
									tagName: "path",
									properties: { d: "M5 18H3" },
									children: [],
								},
							],
						},
						{
							type: "element",
							tagName: "span",
							properties: {
								className: ["explain-tooltip"],
							},
							children: [{ type: "text", value: "Explain Code" }],
						},
					],
				};

				blockAst.children.push(
					h("div", { className: ["explain"] }, [explainButton]),
				);
			},
		},
	});
};
