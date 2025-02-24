import type { WorkersAIModelsSchema } from "~/schemas";

const ModelBadges = ({ model }: { model: WorkersAIModelsSchema }) => {
	const badges = model.properties.flatMap(({ property_id, value }) => {
		if (property_id === "lora" && value === "true") {
			return {
				variant: "tip",
				text: "LoRA",
			};
		}

		if (property_id === "function_calling" && value === "true") {
			return {
				variant: "note",
				text: "Function calling",
			};
		}

		if (property_id === "planned_deprecation_date") {
			const timestamp = Math.floor(new Date(value).getTime() / 1000);

			if (Date.now() > timestamp) {
				return { variant: "danger", text: "Deprecated" };
			}

			return { variant: "danger", text: "Planned deprecation" };
		}

		return [];
	});

	return (
		<ul className="m-0 flex list-none items-center gap-2 p-0 text-xs">
			{badges.map((badge) => (
				<li key={badge.text}>
					<span className="sl-badge gray">{badge.text}</span>
				</li>
			))}
		</ul>
	);
};

export default ModelBadges;
