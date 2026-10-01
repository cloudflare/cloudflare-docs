const DELEGATING_ROOT_LINK_BUDGETS = new Map([["/cloudflare-one/", 150]]);
const DELEGATING_ROOTS = [...DELEGATING_ROOT_LINK_BUDGETS.keys()];
const SIDEBAR_COLLATOR = new Intl.Collator("en");

export interface LlmsIndex {
	title: string;
	url: string;
	description?: string;
	order?: number;
}

export interface LlmsSidebarOrderPart {
	order: number;
	label: string;
	id: string;
}

export interface LlmsSidebarOrderItem {
	id: string;
	label: string;
	order: number | undefined;
}

function compareIds(a: string, b: string): number {
	return a < b ? -1 : a > b ? 1 : 0;
}

export function compareLlmsSidebarOrder(
	a: LlmsSidebarOrderItem,
	b: LlmsSidebarOrderItem,
): number {
	if (a.order !== undefined && b.order !== undefined) {
		const orderDifference = a.order - b.order;
		if (orderDifference !== 0) return orderDifference;
	} else if (a.order !== undefined) {
		return -1;
	} else if (b.order !== undefined) {
		return 1;
	}

	return SIDEBAR_COLLATOR.compare(a.label, b.label) || compareIds(a.id, b.id);
}

function compareLegacyLlmsSidebarOrder(
	a: LlmsSidebarOrderItem,
	b: LlmsSidebarOrderItem,
): number {
	if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
	if (a.order !== undefined) return -1;
	if (b.order !== undefined) return 1;
	return a.label.localeCompare(b.label);
}

export function getLlmsSidebarOrderComparator(
	hasDelegation: boolean,
): (a: LlmsSidebarOrderItem, b: LlmsSidebarOrderItem) => number {
	return hasDelegation
		? compareLlmsSidebarOrder
		: compareLegacyLlmsSidebarOrder;
}

export function compareLlmsSidebarOrderPath(
	a: { label: string; orderPath: LlmsSidebarOrderPart[] },
	b: { label: string; orderPath: LlmsSidebarOrderPart[] },
): number {
	for (
		let index = 0;
		index < Math.min(a.orderPath.length, b.orderPath.length);
		index++
	) {
		const aPart = a.orderPath[index];
		const bPart = b.orderPath[index];
		const orderDifference = aPart.order - bPart.order;
		if (orderDifference !== 0) return orderDifference;
		const labelDifference = SIDEBAR_COLLATOR.compare(aPart.label, bPart.label);
		if (labelDifference !== 0) return labelDifference;
		const idDifference = compareIds(aPart.id, bPart.id);
		if (idDifference !== 0) return idDifference;
	}
	return (
		a.orderPath.length - b.orderPath.length ||
		SIDEBAR_COLLATOR.compare(a.label, b.label)
	);
}

function getDelegatingLlmsRoot(productUrl: string): string | undefined {
	return DELEGATING_ROOTS.find((root) => productUrl.startsWith(root));
}

// Matches configured roots and their descendants. Link budgets apply only to
// exact roots through getDelegatedIndexLinkBudget.
export function isInDelegatingLlmsTree(productUrl: string): boolean {
	return getDelegatingLlmsRoot(productUrl) !== undefined;
}

export function isDelegatingIndexNavigationAlias(
	productUrl: string,
	externalLink: string | undefined,
	documentIds: ReadonlySet<string>,
): boolean {
	const delegatingRoot = getDelegatingLlmsRoot(productUrl);
	if (!delegatingRoot || !externalLink?.startsWith("/")) {
		return false;
	}

	const targetId = externalLink.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
	return (
		targetId.startsWith(delegatingRoot.slice(1)) && documentIds.has(targetId)
	);
}

export function getDelegatedIndexLinkBudget(
	productUrl: string,
): number | undefined {
	return DELEGATING_ROOT_LINK_BUDGETS.get(productUrl);
}

export function assertLlmsIndexLinkBudget(
	productUrl: string,
	markdown: string,
): void {
	const linkBudget = getDelegatedIndexLinkBudget(productUrl);
	const linkCount = markdown.match(/^- \[/gm)?.length ?? 0;
	if (linkBudget !== undefined && linkCount > linkBudget) {
		throw new Error(
			`${productUrl}llms.txt contains ${linkCount} links, exceeding its ${linkBudget}-link budget`,
		);
	}
}

export function getDelegatedIndexes(
	productUrl: string,
	indexes: LlmsIndex[],
): LlmsIndex[] {
	if (!isInDelegatingLlmsTree(productUrl)) {
		return [];
	}

	const descendants = indexes.filter(
		(index) => index.url !== productUrl && index.url.startsWith(productUrl),
	);

	return descendants
		.filter(
			(candidate) =>
				!descendants.some(
					(other) =>
						other.url !== candidate.url && candidate.url.startsWith(other.url),
				),
		)
		.sort((a, b) => a.url.localeCompare(b.url));
}

export function isCoveredByDelegatedIndex(
	pageId: string,
	indexes: LlmsIndex[],
): boolean {
	const pageUrl = `/${pageId}/`;
	return indexes.some((index) => pageUrl.startsWith(index.url));
}
