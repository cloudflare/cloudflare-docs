import { useMemo } from "react";
import {
	useFramework,
	type Platform,
	webFrameworks,
	mobileFrameworks,
} from "../hooks/useFramework";

export default function SDKSelector() {
	const { platform, framework, setSelection } = useFramework();

	const platforms: {
		label: string;
		id: Platform;
	}[] = [
		{
			label: "Web",
			id: "web",
		},
		{
			label: "Mobile",
			id: "mobile",
		},
	];

	const frameworks = useMemo(
		() => (platform === "web" ? webFrameworks : mobileFrameworks),
		[platform],
	);

	return (
		<>
			<div className="my-5 flex flex-col gap-0 rounded-md bg-blue-100 p-2 dark:bg-neutral-800">
				<div className="flex w-full flex-row items-start justify-start gap-2">
					{platforms.map((p) => (
						<button
							type="button"
							className={`m-0 ${p.id === platform ? "rounded-t-md bg-neutral-50 text-blue-500 dark:bg-neutral-700" : "bg-blue-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"} px-2 py-1 font-medium`}
							onClick={() => {
								const nextPlatform = p.id;
								const nextFramework =
									nextPlatform === "web"
										? webFrameworks[0]
										: mobileFrameworks[0];

								setSelection(nextPlatform, nextFramework);
							}}
							key={p.id}
						>
							{p.label}
						</button>
					))}
				</div>
				{frameworks.length < 1 && (
					<div className="m-0 w-full rounded-r-md rounded-b-md bg-neutral-50 p-4 text-sm text-gray-500 italic dark:bg-neutral-700 dark:text-gray-400">
						No frameworks available.
					</div>
				)}
				<div className="m-0 flex w-full flex-row items-center gap-2 rounded-r-md rounded-b-md bg-neutral-50 p-2 text-gray-500 dark:bg-neutral-700 dark:text-gray-400">
					{frameworks.map((fw) => {
						const handleClick = () => {
							setSelection(platform, fw);
						};

						return (
							<button
								key={fw.id}
								type="button"
								className={`m-0 flex ${framework?.id === fw.id ? "text-blue-500 italic" : ""} text-md cursor-pointer items-center rounded-md bg-neutral-50 px-3 py-1 font-medium dark:bg-neutral-700`}
								onClick={handleClick}
							>
								{fw.label}
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
}
