import { useMemo } from "react";
import {
	useFramework,
	type Platform,
	webFrameworks,
	mobileFrameworks,
} from "../hooks/useFramework";

interface SDKSelectorProps {
	disabledPlatforms?: Platform[];
}

export default function SDKSelector({ disabledPlatforms }: SDKSelectorProps) {
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
		{
			label: "React",
			id: "web-react",
		},
		{
			label: "Web Components",
			id: "web-web-components",
		},
		{
			label: "Angular",
			id: "web-angular",
		},
		{
			label: "Android",
			id: "mobile-android",
		},
		{
			label: "iOS",
			id: "mobile-ios",
		},
		{
			label: "Flutter",
			id: "mobile-flutter",
		},
		{
			label: "React Native",
			id: "mobile-react-native",
		},
	];

	const mainPlatforms = platforms.filter(
		(p) => p.id === "web" || p.id === "mobile",
	);

	const frameworkToPlatform: Record<string, Platform> = {
		react: "web-react",
		"web-components": "web-web-components",
		angular: "web-angular",
		android: "mobile-android",
		ios: "mobile-ios",
		flutter: "mobile-flutter",
		"react-native": "mobile-react-native",
	};

	const frameworks = useMemo(
		() => (platform === "web" ? webFrameworks : mobileFrameworks),
		[platform],
	);

	const isPlatformDisabled = (p: Platform) =>
		Boolean(disabledPlatforms?.includes(p));

	const isFrameworkDisabled = (fw: { id: string; label: string }) => {
		const subPlatform = frameworkToPlatform[fw.id];
		return subPlatform ? isPlatformDisabled(subPlatform) : false;
	};

	const isWebPlatformDisabled = () => {
		if (isPlatformDisabled("web")) return true;

		const allWebDisabled = webFrameworks.every((fw) => isFrameworkDisabled(fw));
		return allWebDisabled;
	};

	const isMobilePlatformDisabled = () => {
		if (isPlatformDisabled("mobile")) return true;

		const allMobileDisabled = mobileFrameworks.every((fw) =>
			isFrameworkDisabled(fw),
		);
		return allMobileDisabled;
	};

	const activePlatformDisabled =
		platform === "web" ? isWebPlatformDisabled() : isMobilePlatformDisabled();

	const disabledPlatformsString = disabledPlatforms
		?.map((p) => platforms.find((platform) => platform.id === p)?.label || p)
		.join(", ");

	return (
		<>
			{disabledPlatforms && (
				<div className="flex flex-row gap-1 rounded-md bg-blue-100 p-2 text-blue-900 dark:bg-neutral-800 dark:text-neutral-300">
					This page is not available for the <b>{disabledPlatformsString}</b>
					platform.
				</div>
			)}
			<div className="my-5 flex flex-col gap-0 rounded-md bg-blue-100 p-2 dark:bg-neutral-800">
				<div className="flex w-full flex-row items-start justify-start gap-2">
					{mainPlatforms.map((p) => {
						const disabled =
							p.id === "web"
								? isWebPlatformDisabled()
								: p.id === "mobile"
									? isMobilePlatformDisabled()
									: isPlatformDisabled(p.id);

						return (
							<button
								key={p.id}
								type="button"
								disabled={disabled}
								className={`m-0 ${p.id === platform ? "rounded-t-md bg-neutral-50 text-blue-500 dark:bg-neutral-700" : "bg-blue-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"} ${disabled ? "cursor-not-allowed opacity-50" : ""} px-2 py-1 font-medium`}
								onClick={() => {
									if (disabled) return;
									const nextPlatform = p.id;
									const nextFramework =
										nextPlatform === "web"
											? webFrameworks[0]
											: mobileFrameworks[0];

									setSelection(nextPlatform, nextFramework);
								}}
							>
								{p.label}
							</button>
						);
					})}
				</div>
				{activePlatformDisabled && (
					<div className="m-0 w-full rounded-r-md rounded-b-md bg-neutral-50 p-4 text-sm text-gray-700 dark:bg-neutral-700 dark:text-gray-300">
						This page is not available for the {platform} platform.
					</div>
				)}
				{!activePlatformDisabled && frameworks.length < 1 && (
					<div className="m-0 w-full rounded-r-md rounded-b-md bg-neutral-50 p-4 text-sm text-gray-500 italic dark:bg-neutral-700 dark:text-gray-400">
						No frameworks available.
					</div>
				)}
				{!activePlatformDisabled && (
					<div className="m-0 flex w-full flex-row items-center gap-2 rounded-r-md rounded-b-md bg-neutral-50 p-2 text-gray-500 dark:bg-neutral-700 dark:text-gray-400">
						{frameworks.map((fw) => {
							const disabled = isFrameworkDisabled(fw);
							const handleClick = () => {
								if (disabled) return;
								setSelection(platform, fw);
							};

							return (
								<button
									key={fw.id}
									type="button"
									disabled={disabled}
									className={`m-0 flex ${framework?.id === fw.id ? "text-blue-500 italic" : ""} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} text-md items-center rounded-md bg-neutral-50 px-3 py-1 font-medium dark:bg-neutral-700`}
									onClick={handleClick}
								>
									{fw.label}
								</button>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
