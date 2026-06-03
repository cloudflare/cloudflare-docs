import type { WorkersAIModelsSchema } from "~/schemas";
import type { ModelCardData, ResolvedModel } from "~/util/model-types";
import { getModelAuthor } from "~/util/model-helpers";
import { authorData } from "./data";

type ModelType = WorkersAIModelsSchema | ResolvedModel | ModelCardData;

const ModelInfo = ({ model }: { model: ModelType }) => {
	const authorId = getModelAuthor(model.name);
	const author = authorData[authorId]?.name ?? authorId;
	// Hosting is now surfaced as a badge by ModelBadges, so it is intentionally
	// omitted here to avoid duplicating the same string on every card.
	return (
		<span className="mt-2 block! leading-5 text-gray-400">
			{model.task.name} • {author}
		</span>
	);
};

export default ModelInfo;
