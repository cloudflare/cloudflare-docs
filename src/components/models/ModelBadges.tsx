import type { WorkersAIModelsSchema } from "~/schemas";

const ModelBadges = ({
	model,
	showTags = false,
}: {
	model: WorkersAIModelsSchema;
	showTags?: boolean;
}) => {
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

		if (property_id === "async_queue" && value === "true") {
			return {
				variant: "note",
				text: "Batch",
			};
		}

		if (property_id === "partner" && value === "true") {
			return {
				variant: "note",
				text: "Partner",
			};
		}

		if (property_id === "realtime" && value === "true") {
			return {
				variant: "note",
				text: "Real-time",
			};
		}

		if (property_id === "planned_deprecation_date") {
			const timestamp = Math.floor(new Date(value as string).getTime());

			if (Date.now() > timestamp) {
				return { variant: "danger", text: "Deprecated" };
			}

			return { variant: "danger", text: "Planned deprecation" };
		}

		return [];
	});

	// Add tags as badges if showTags is enabled
	const tagBadges =
		showTags && model.tags
			? model.tags.slice(0, 3).map((tag) => ({
					variant: "default",
					text: tag,
					isTag: true,
				}))
			: [];

	const allBadges = [...badges, ...tagBadges];

	return (
		<ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-xs">
			{allBadges.map((badge) => (
				<li key={badge.text} className="m-0">
					<span
						className={`sl-badge ${
							"isTag" in badge && badge.isTag
								? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
								: "default"
						}`}
					>
						{badge.text}
					</span>
				</li>
			))}
		</ul>
	);
};

export default ModelBadges;
