const ModelBadges = ({ model }) => {
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
		<ul className="list-none m-0 p-0 flex items-center gap-2 text-xs">
			{badges.map((badge) => (
				<li
					key={badge.text}
					className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md block !mt-0"
				>
					{badge.text}
				</li>
			))}
		</ul>
	);
};

export default ModelBadges;
