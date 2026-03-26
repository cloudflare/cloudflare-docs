import type { WorkersAIModelsSchema } from "~/schemas";
import { CAPABILITY_PROPERTIES } from "~/util/model-properties";

const CATEGORY_BADGE: Record<string, string> = {
	model: "default", // gray
	platform: "caution", // orange
};

const ModelBadges = ({ model }: { model: WorkersAIModelsSchema }) => {
	const badges = model.properties.flatMap(({ property_id, value }) => {
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
