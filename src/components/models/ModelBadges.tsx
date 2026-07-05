import type { WorkersAIModelsSchema } from "~/schemas";
import type { ModelCardData, ResolvedModel } from "~/util/model-types";
import { CAPABILITY_PROPERTIES } from "~/util/model-properties";

const CATEGORY_BADGE: Record<string, string> = {
	model: "default", // gray
	platform: "caution", // orange
};

type ModelType = WorkersAIModelsSchema | ResolvedModel | ModelCardData;

type Badge = {
	variant: string;
	text: string;
	/**
	 * Optional supplementary text rendered as the HTML `title` attribute on
	 * the badge span. Currently only the ZDR badge carries one (sourced from
	 * `zdr_comment` on the catalog row) — leaving every other badge without
	 * a tooltip.
	 */
	title?: string;
};

const ModelBadges = ({ model }: { model: ModelType }) => {
	// Provider badge: every card surfaces where the model runs (Cloudflare's
	// infrastructure vs proxied to a third-party). Defaults to
	// "Cloudflare-hosted" for legacy models that pre-date the hosting field.
	const isProxied = "hosting" in model && model.hosting === "proxied";
	const providerBadge: Badge = {
		variant: "default",
		text: isProxied ? "Third-party" : "Cloudflare-hosted",
	};

	// Catalog rows carry `zdr_comment` on the resolved model rather than in the
	// properties array (Property.value is string-only). Look it up once so the
	// per-badge map below can attach it as a `title` tooltip on the ZDR span.
	const zdrComment = "zdrComment" in model ? (model.zdrComment ?? null) : null;

	const propertyBadges: Badge[] = model.properties.flatMap(
		({ property_id, value }) => {
			// Boolean capability badges (data-driven)
			if (property_id in CAPABILITY_PROPERTIES && value === "true") {
				const def = CAPABILITY_PROPERTIES[property_id];
				const badge: Badge = {
					variant: CATEGORY_BADGE[def.category] ?? "default",
					text: def.label,
				};
				if (property_id === "zdr" && zdrComment) {
					badge.title = zdrComment;
				}
				return badge;
			}

			// Special case: deprecation badge (not a boolean capability)
			if (property_id === "planned_deprecation_date") {
				const timestamp = Math.floor(new Date(value as string).getTime());

				if (Date.now() > timestamp) {
					return { variant: "danger", text: "Deprecated" };
				}

				return { variant: "danger", text: "Planned deprecation" };
			}

			return [];
		},
	);

	const badges = [providerBadge, ...propertyBadges];

	return (
		<ul className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-xs [&>li]:m-0">
			{badges.map((badge) => (
				<li key={badge.text}>
					<span className={`sl-badge ${badge.variant}`} title={badge.title}>
						{badge.text}
					</span>
				</li>
			))}
		</ul>
	);
};

export default ModelBadges;
