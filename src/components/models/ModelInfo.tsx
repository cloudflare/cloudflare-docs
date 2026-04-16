import type { WorkersAIModelsSchema } from "~/schemas";
import type { ResolvedModel } from "~/util/model-types";
import { getModelAuthor } from "~/util/model-helpers";
import { authorData } from "./data";

type ModelType = WorkersAIModelsSchema | ResolvedModel;

const ModelInfo = ({ model }: { model: ModelType }) => {
	const authorId = getModelAuthor(model.name);
	const author = authorData[authorId]?.name ?? authorId;
	const hosting =
		"hosting" in model
			? model.hosting === "proxied"
				? "Proxied"
				: "Hosted"
			: "Hosted";
	return (
		<span className="mt-2 block! leading-5 text-gray-400">
			{model.task.name} • {author} • {hosting}
		</span>
	);
};

export default ModelInfo;
