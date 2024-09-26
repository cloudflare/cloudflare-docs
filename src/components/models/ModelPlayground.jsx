import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ModelPlayground = ({ model }) => {
	const [response, setResponse] = useState("");
	const [prompt, setPrompt] = useState("");

	const handleSubmmit = () => {
		fetch("https://ai.cloudflare.com/api/inference", {
			method: "POST",
			body: JSON.stringify({
				model: model.name,
				prompt,
			}),
		});
	};

	return (
		<div className="shadow-2xl shadow-zinc-100 border border-gray-200 rounded-xl">
			<div className="flex m-3 border border-gray-200 rounded-md items-start hover:bg-gray-50">
				<TextareaAutosize
					className="w-full p-2 resize-none outline-none bg-transparent"
					minRows={1}
					maxRows={4}
					placeholder="Enter prompt..."
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<button
					onClick={handleSubmmit}
					className="!m-2 rounded-md px-3 bg-gray-200 hover:bg-gray-300 cursor-pointer"
				>
					Submit
				</button>
			</div>
			<div className="bg-orange-50 min-h-32 mx-3 rounded-md">{response}</div>
			<span className="m-3 block text-sm text-gray-400 font-mono">
				{model.name}
			</span>
		</div>
	);
};

export default ModelPlayground;
