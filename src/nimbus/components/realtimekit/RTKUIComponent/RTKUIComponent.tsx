interface Props {
	id: string;
	name: string;
	imagePath: string;
	componentName: string;
}

import { useMemo, useState } from "react";
import { useFramework } from "../hooks/useFramework";

const kebabToPascalCase = (str: string): string => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
};

const RTKUIComponent = ({ id, imagePath, name, componentName }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { platform, framework } = useFramework();

	const component = useMemo(() => {
		if (platform !== "web") return componentName;
		if (framework.id === "react") return kebabToPascalCase(componentName);
		return componentName;
	}, [platform, framework, componentName]);

	const toggleImageSize = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="mt-2 flex flex-col items-center gap-3" id={id}>
			{!isExpanded && (
				<div className="relative">
					<img
						src={imagePath}
						alt={name}
						style={{ border: "solid 1px #ccc", width: "200px" }}
						className={`w-full rounded-md transition-all duration-300 ease-in-out`}
					/>
					<button
						onClick={toggleImageSize}
						style={{ border: "solid 4px #fff" }}
						className={`absolute bottom-0 left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md p-1 text-black`}
					>
						⛶
					</button>
				</div>
			)}

			{isExpanded && (
				<div
					className="flex flex-col items-center gap-4 rounded-md p-4"
					style={{
						width: "100%",
						background: "white",
						border: "solid 1px #ccc",
					}}
				>
					<div className="relative">
						<img
							src={imagePath}
							alt={name}
							style={{
								border: "solid 1px #ccc",
								width: "100%",
								height: "500px",
							}}
							className={`w-full rounded-md transition-all duration-300 ease-in-out`}
						/>
						<button
							onClick={toggleImageSize}
							style={{ border: "solid 4px #fff" }}
							className={`absolute bottom-0 left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md p-1 text-black`}
						>
							−
						</button>
					</div>
					<code className="w-fit rounded-sm bg-gray-100 p-1 dark:bg-neutral-700">
						{component}
					</code>
				</div>
			)}

			{!isExpanded && (
				<code className="w-fit rounded-sm bg-gray-100 p-1 dark:bg-neutral-700">
					{component}
				</code>
			)}
		</div>
	);
};

export default RTKUIComponent;
