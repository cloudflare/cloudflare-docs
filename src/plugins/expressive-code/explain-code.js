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

			/* Hide the "Copied!" feedback tooltip — we use a checkmark icon instead */
			.expressive-code .copy .feedback {
				display: none !important;
			}

			/*
				When the feedback element is present (i.e. after a successful copy),
				swap the copy icon for a checkmark. The feedback element stays in the
				DOM for ~2.5s, so the checkmark is visible for the same duration.
			*/
			.expressive-code .copy:has(.feedback) button::after {
				mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='black'%3E%3Cpath d='M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z'/%3E%3C/svg%3E") !important;
				-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='black'%3E%3Cpath d='M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z'/%3E%3C/svg%3E") !important;
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

			@media (hover: hover) {
				.expressive-code .explain button {
					opacity: 0;
				}
			}

			.expressive-code .frame:hover .explain button:not(:hover),
			.expressive-code .frame:focus-within :focus-visible ~ .explain button:not(:hover) {
				opacity: 0.75;
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

	
		`,
		hooks: {
			postprocessRenderedBlock: async (context) => {
				const blockAst = /** @type {import("hast").Element} */ (
					context.renderData.blockAst
				);

				// Add a custom tooltip span to the copy button and remove the
				// native title attribute so the browser tooltip doesn't double up.
				const copyDiv = blockAst.children.find(
					(n) =>
						n.type === "element" &&
						/** @type {import("hast").Element} */ (n).properties?.className
							?.toString()
							.includes("copy"),
				);
				if (copyDiv?.type === "element") {
					const copyButton = /** @type {import("hast").Element} */ (
						copyDiv
					).children?.find(
						(n) =>
							n.type === "element" &&
							/** @type {import("hast").Element} */ (n).tagName === "button",
					);
					if (copyButton?.type === "element") {
						delete copyButton.properties.title;
					}
				}

				const lineCount = context.codeBlock.code.split("\n").length;

				if (lineCount < 10) return;

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
					],
				};

				blockAst.children.push(
					h("div", { className: ["explain"] }, [explainButton]),
				);
			},
		},
	});
};
