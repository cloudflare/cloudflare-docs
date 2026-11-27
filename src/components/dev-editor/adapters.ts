export type EditableMode = "prose" | "single-line" | "code";

export interface EditableDescriptor {
	element: HTMLElement;
	kind: string;
	mode: EditableMode;
	codeLang?: string;
}

const EXCLUDED_COMPONENT_ANCESTOR =
	"cfdocs-dev-editor, [data-dev-editor-ignore], astro-island, .mermaid, .sr-only, [aria-hidden='true']";

const PROSE_CHILD_BLOCK_SELECTOR =
	"p, ul, ol, blockquote, pre, table, h1, h2, h3, h4, h5, h6";

function isExcluded(el: HTMLElement): boolean {
	return el.closest(EXCLUDED_COMPONENT_ANCESTOR) !== null;
}

function getDirectTextContent(el: Element): string {
	return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

function resolveCodeLanguage(codeEl: HTMLElement): string | undefined {
	if (codeEl.hasAttribute("data-nb-pm-code")) return "sh";
	const pre = codeEl.closest("pre");
	const figure = codeEl.closest(".nb-code-figure");
	const lang =
		pre?.getAttribute("data-language") ??
		pre?.getAttribute("data-nb-lang") ??
		figure?.getAttribute("data-nb-lang") ??
		undefined;
	return lang && lang !== "plaintext" && lang !== "text" ? lang : lang;
}

function resolvePackageManagerTabLabel(panel: Element): string | null {
	const labelledBy = panel.getAttribute("aria-labelledby");
	if (!labelledBy) return null;
	const doc = panel.ownerDocument;
	const tab = doc.getElementById(labelledBy);
	const label = tab ? getDirectTextContent(tab) : "";
	return label || null;
}

/**
 * Discover editable targets exposed by Cloudflare Docs / Nimbus components
 * purely from their rendered DOM, so zero editor code or markup ships in
 * production builds.
 */
export function collectComponentDescriptors(
	doc: Document,
): EditableDescriptor[] {
	const descriptors: EditableDescriptor[] = [];

	const add = (
		element: HTMLElement | null | undefined,
		kind: string,
		mode: EditableMode,
		codeLang?: string,
	) => {
		if (!element) return;
		if (isExcluded(element)) return;
		if (getDirectTextContent(element).length === 0) return;
		descriptors.push({ element, kind, mode, codeLang });
	};

	const containers = Array.from(
		doc.querySelectorAll<HTMLElement>(".docs-content"),
	);

	for (const root of containers) {
		// 1. <Aside> title
		for (const aside of Array.from(
			root.querySelectorAll<HTMLElement>("aside.aside-card"),
		)) {
			const titleEl = aside.querySelector<HTMLElement>(":scope > div > p");
			add(titleEl, "<Aside> title", "single-line");
		}

		// 2. <Example> title
		for (const example of Array.from(
			root.querySelectorAll<HTMLElement>("article.bg-card.ring-border"),
		)) {
			const titleEl = example.querySelector<HTMLElement>(":scope > h3");
			add(titleEl, "<Example> title", "single-line");
		}

		// 3. <Card>, <LinkCard>, <LinkTitleCard>
		for (const card of Array.from(
			root.querySelectorAll<HTMLElement>(
				"article:not(.docs-content):not(.bg-card)",
			),
		)) {
			const isLinkCard =
				card.classList.contains("group/card") ||
				card.querySelector(
					":scope > h2 > a, :scope > h3 > a, :scope > h4 > a, :scope > h5 > a, :scope > h6 > a, :scope > p > a",
				) !== null;
			const componentName = isLinkCard ? "<LinkCard>" : "<Card>";

			const heading = card.querySelector<HTMLElement>(
				":scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6, :scope > p",
			);
			const headingLink = heading?.querySelector<HTMLElement>(":scope > a");
			add(headingLink ?? heading, `${componentName} title`, "single-line");

			const bodyDiv = card.querySelector<HTMLElement>(":scope > div");
			if (
				bodyDiv &&
				bodyDiv.querySelector(PROSE_CHILD_BLOCK_SELECTOR) === null
			) {
				add(bodyDiv, `${componentName} description`, "prose");
			}
		}

		// 4. <GuideCard>
		for (const guideCard of Array.from(
			root.querySelectorAll<HTMLElement>('a[class*="group/guide-card"]'),
		)) {
			add(
				guideCard.querySelector<HTMLElement>("div.uppercase"),
				"<GuideCard> product",
				"single-line",
			);
			add(
				guideCard.querySelector<HTMLElement>("h3, h4"),
				"<GuideCard> title",
				"single-line",
			);
			add(
				guideCard.querySelector<HTMLElement>("p"),
				"<GuideCard> description",
				"prose",
			);
			add(
				guideCard.querySelector<HTMLElement>(":scope > span"),
				"<GuideCard> cta",
				"single-line",
			);
		}

		// 5. <Details> header (skip <FileTree> directory disclosures)
		for (const details of Array.from(
			root.querySelectorAll<HTMLElement>("details"),
		)) {
			if (details.closest("[data-file-tree]")) continue;
			const summary = details.querySelector<HTMLElement>(":scope > summary");
			if (!summary) continue;
			const innerP = summary.querySelector<HTMLElement>(":scope > p");
			add(innerP ?? summary, "<Details> header", "single-line");
		}

		// 6. <Tabs> / <TabItem> trigger labels (excluding PackageManagers tabs)
		for (const tabBtn of Array.from(
			root.querySelectorAll<HTMLElement>(
				'[data-nb-tabs] [role="tab"]:not([data-nb-pm-tab])',
			),
		)) {
			add(tabBtn, "<TabItem> label", "single-line");
		}

		// 7. <Steps> / <Step>
		for (const step of Array.from(
			root.querySelectorAll<HTMLElement>("[data-nb-steps] [data-step]"),
		)) {
			add(
				step.querySelector<HTMLElement>(":scope > p"),
				"<Step> title",
				"single-line",
			);
			const bodyDiv = step.querySelector<HTMLElement>(":scope > div");
			if (
				bodyDiv &&
				bodyDiv.querySelector(PROSE_CHILD_BLOCK_SELECTOR) === null
			) {
				add(bodyDiv, "<Step> body", "prose");
			}
		}

		// 8. <Feature>
		for (const feature of Array.from(
			root.querySelectorAll<HTMLElement>("div.feature"),
		)) {
			add(
				feature.querySelector<HTMLElement>(":scope > a"),
				"<Feature> header",
				"single-line",
			);
			const desc = feature.querySelector<HTMLElement>(
				":scope > .feature-description",
			);
			if (desc && desc.querySelector(PROSE_CHILD_BLOCK_SELECTOR) === null) {
				add(desc, "<Feature> description", "prose");
			}
			const cta = feature.querySelector<HTMLElement>(":scope > span");
			if (cta && getDirectTextContent(cta).length > 0) {
				// Feature CTA spans carry aria-hidden="true" visually; explicitly allow editing them.
				if (!cta.closest("cfdocs-dev-editor, [data-dev-editor-ignore]")) {
					descriptors.push({
						element: cta,
						kind: "<Feature> cta",
						mode: "single-line",
					});
				}
			}
		}

		// 9. <RelatedProduct>
		for (const related of Array.from(
			root.querySelectorAll<HTMLElement>('[class*="grid-cols-[44px_1fr]"]'),
		)) {
			const contentCol = related.querySelector<HTMLElement>(":scope > div");
			if (!contentCol) continue;
			add(
				contentCol.querySelector<HTMLElement>(":scope > a"),
				"<RelatedProduct> header",
				"single-line",
			);
			const desc = contentCol.querySelector<HTMLElement>(":scope > div");
			if (desc && desc.querySelector(PROSE_CHILD_BLOCK_SELECTOR) === null) {
				add(desc, "<RelatedProduct> description", "prose");
			}
		}

		// 10. <CopyPrompt> text
		for (const promptText of Array.from(
			root.querySelectorAll<HTMLElement>(
				"[data-copy-prompt] [data-copy-prompt-text]",
			),
		)) {
			add(promptText, "<CopyPrompt> text", "prose");
		}

		// 11. <FileTree> labels (excluding placeholder ellipsis rows)
		for (const label of Array.from(
			root.querySelectorAll<HTMLElement>("[data-file-tree] .ft-label"),
		)) {
			if (label.closest("[data-placeholder]")) continue;
			add(label, "<FileTree> entry", "single-line");
		}

		// 12. Code block filenames & code contents (<Code>, fenced blocks,
		// <TypeScriptExample>, <WranglerConfig>, <PackageManagers>)
		for (const titleName of Array.from(
			root.querySelectorAll<HTMLElement>(".nb-code-figure .nb-code-title-name"),
		)) {
			add(titleName, "code block filename", "single-line");
		}

		for (const codeEl of Array.from(
			root.querySelectorAll<HTMLElement>("pre > code"),
		)) {
			if (codeEl.closest("[data-file-tree]")) continue;
			const lang = resolveCodeLanguage(codeEl);
			const kind = codeEl.hasAttribute("data-nb-pm-code")
				? "<PackageManagers> command"
				: lang
					? `code block (${lang})`
					: "code block";
			add(codeEl, kind, "code", lang);
		}

		// 13. Standalone <LinkButton> / <DashButton> (skip those inside prose blocks)
		for (const btn of Array.from(
			root.querySelectorAll<HTMLElement>("a[data-nb-button]"),
		)) {
			if (btn.closest("p, li, td, th, blockquote, h1, h2, h3, h4, h5, h6")) {
				continue;
			}
			const href = btn.getAttribute("href") ?? "";
			const isDash =
				href.includes("dash.cloudflare.com") ||
				href.includes("one.dash.cloudflare.com");
			add(
				btn,
				isDash ? "<DashButton> label" : "<LinkButton> label",
				"single-line",
			);
		}

		// 14. Standalone <Badge> / <InlineBadge> (skip those inside prose or headings)
		for (const badge of Array.from(
			root.querySelectorAll<HTMLElement>("span.rounded-full"),
		)) {
			if (
				badge.closest(
					"p, li, td, th, blockquote, h1, h2, h3, h4, h5, h6, a, button, pre",
				)
			) {
				continue;
			}
			add(badge, "<Badge> text", "single-line");
		}
	}

	return descriptors;
}

/**
 * Identify enclosing docs components from outermost to innermost so edits
 * inside components are clearly isolated and attributed in the generated prompt.
 */
export function findComponentContext(element: HTMLElement): string[] {
	if (element.dataset.devEditable?.startsWith("frontmatter:")) {
		return [];
	}

	const container = element.closest(".docs-content");
	if (!container) return [];

	const insideSummary = element.closest("summary");
	const labels: string[] = [];
	let current = element.parentElement;

	while (current && current !== container) {
		const tag = current.tagName.toLowerCase();

		const cliVariant =
			current.dataset.cliVariantsItem ?? current.dataset.nbCliVariant;
		if (cliVariant) {
			labels.push(`<CliVariant cli="${cliVariant}">`);
		} else if (current.hasAttribute("data-nb-pm-panel")) {
			const mgr = resolvePackageManagerTabLabel(current);
			labels.push(mgr ? `<PackageManagers tab="${mgr}">` : "<PackageManagers>");
		} else if (
			current.hasAttribute("data-nb-tabs-content") &&
			current.dataset.nbTabLabel
		) {
			labels.push(`<TabItem label="${current.dataset.nbTabLabel}">`);
		} else if (tag === "aside" && current.classList.contains("aside-card")) {
			const title = current.getAttribute("aria-label")?.trim();
			labels.push(title ? `<Aside title="${title}">` : "<Aside>");
		} else if (current.hasAttribute("data-file-tree")) {
			labels.push("<FileTree>");
		} else if (tag === "details" && !current.closest("[data-file-tree]")) {
			if (!insideSummary || insideSummary.parentElement !== current) {
				const summaryEl =
					current.querySelector<HTMLElement>(":scope > summary");
				const summaryText = summaryEl ? getDirectTextContent(summaryEl) : "";
				labels.push(
					summaryText ? `<Details header="${summaryText}">` : "<Details>",
				);
			}
		} else if (current.hasAttribute("data-step")) {
			const titleEl = current.querySelector<HTMLElement>(":scope > p");
			const titleText =
				titleEl && titleEl !== element ? getDirectTextContent(titleEl) : "";
			labels.push(titleText ? `<Step title="${titleText}">` : "<Step>");
		} else if (current.hasAttribute("data-nb-steps")) {
			labels.push("<Steps>");
		} else if (current.classList.contains("feature")) {
			const headerEl = current.querySelector<HTMLElement>(":scope > a");
			const headerText =
				headerEl && headerEl !== element ? getDirectTextContent(headerEl) : "";
			labels.push(
				headerText ? `<Feature header="${headerText}">` : "<Feature>",
			);
		} else if (current.className.includes("grid-cols-[44px_1fr]")) {
			const headerEl = current.querySelector<HTMLElement>(":scope > div > a");
			const headerText =
				headerEl && headerEl !== element ? getDirectTextContent(headerEl) : "";
			labels.push(
				headerText
					? `<RelatedProduct header="${headerText}">`
					: "<RelatedProduct>",
			);
		} else if (tag === "a" && current.className.includes("group/guide-card")) {
			const titleEl = current.querySelector<HTMLElement>("h3, h4");
			const titleText =
				titleEl && titleEl !== element ? getDirectTextContent(titleEl) : "";
			labels.push(
				titleText ? `<GuideCard title="${titleText}">` : "<GuideCard>",
			);
		} else if (
			tag === "article" &&
			current.classList.contains("bg-card") &&
			current.classList.contains("ring-border")
		) {
			const titleEl = current.querySelector<HTMLElement>(":scope > h3");
			const titleText =
				titleEl && titleEl !== element ? getDirectTextContent(titleEl) : "";
			labels.push(titleText ? `<Example title="${titleText}">` : "<Example>");
		} else if (
			tag === "article" &&
			!current.classList.contains("docs-content")
		) {
			const isLinkCard =
				current.classList.contains("group/card") ||
				current.querySelector(
					":scope > h2 > a, :scope > h3 > a, :scope > h4 > a, :scope > h5 > a, :scope > h6 > a, :scope > p > a",
				) !== null;
			const comp = isLinkCard ? "LinkCard" : "Card";
			const cardHeading = current.querySelector<HTMLElement>(
				":scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6, :scope > p",
			);
			const cardTitle =
				cardHeading && !cardHeading.contains(element)
					? getDirectTextContent(cardHeading)
					: "";
			labels.push(cardTitle ? `<${comp} title="${cardTitle}">` : `<${comp}>`);
		}

		current = current.parentElement;
	}

	return labels.reverse();
}
