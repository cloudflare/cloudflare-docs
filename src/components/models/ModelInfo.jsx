import { authorData } from "./data";

const ModelInfo = ({ model }) => {
	const author =
		authorData[model.name.split("/")[1]]?.name ?? model.name.split("/")[1];
	return (
		<span className="text-gray-400 !block mt-2 leading-5">
			{model.task.name} • {author}
		</span>
	);
};

export default ModelInfo;
