import type { WorkersAIModelsSchema } from "~/schemas";
import { authorData } from "./data";

const ModelInfo = ({ model }: { model: WorkersAIModelsSchema }) => {
	const author =
		authorData[model.name.split("/")[1]]?.name ?? model.name.split("/")[1];
	return (
		<span className="mt-2 !block leading-5 text-gray-400">
			{model.task.name} • {author}
		</span>
	);
};

export default ModelInfo;
