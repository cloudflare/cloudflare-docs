import type { WorkersAIModelsSchema } from "~/schemas";
import type { ModelCardData, ResolvedModel } from "~/util/model-types";
import { CAPABILITY_PROPERTIES } from "~/util/model-properties";

const CATEGORY_BADGE: Record<string, string> = {
	model: "default", // gray
	platform: "caution", // orange
};

type ModelType = WorkersAIModelsSchema | ResolvedModel | ModelCardData;

const ModelBadges = ({ model }: { model: ModelType }) => {
	// Provider badge: every card surfaces where the model runs (Cloudflare's
	// infrastructure vs proxied to a third-party). Defaults to
	// "Cloudflare-hosted" for legacy models that pre-date the hosting field.
	const isProxied = "hosting" in model && model.hosting === "proxied";
	const providerBadge = {
		variant: "default",
		text: isProxied ? "Third-party" : "Cloudflare-hosted",
	};

	const propertyBadges = model.properties.flatMap(({ property_id, value }) => {
		// Boolean capability badges (data-driven)
		if (property_id in CAPABILITY_PROPERTIES && value === "true") {
			const def = CAPABILITY_PROPERTIES[property_id];
			return {
				variant: CATEGORY_BADGE[def.category] ?? "default",
				text: def.label,
			};
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
	});

	const badges = [providerBadge, ...propertyBadges];

	return (
		<ul className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-xs [&>li]:m-0">
			{badges.map((badge) => (
				<li key={badge.text}>
					<span className={`sl-badge ${badge.variant}`}>{badge.text}</span>
				</li>
			))}
		</ul>
	);
};

export default ModelBadges;
