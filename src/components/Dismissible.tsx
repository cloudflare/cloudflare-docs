import { useEffect, useState, type CSSProperties } from "react";

import { map } from "nanostores";
import { useStore } from "@nanostores/react";

const dismissedMap = map<Record<string, boolean>>({});
export const isDismissed = (id: string) => dismissedMap.get()[id];
export const setIsDismissed = (id: string, value: boolean) =>
	dismissedMap.setKey(id, value);

const loadInitialValue = (id: string) => {
	if (typeof localStorage === "undefined") return false;

	const dismissValue = localStorage.getItem(`dismisser-${id}`);

	if (dismissValue) {
		if (new Date(dismissValue) > new Date()) {
			return true;
		} else {
			localStorage.removeItem(`dismisser-${id}`);
		}
	}

	return false;
};

export const useDismissible = (id: string) => {
	const store = useStore(dismissedMap);

	return {
		isDismissed: store[id],
		dismiss: (days: number) => {
			setIsDismissed(id, true);
			localStorage.setItem(
				`dismisser-${id}`,
				new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
			);
		},
	};
};

export const Dismisser = ({
	id,
	days,
	children,
}: {
	id: string;
	days: number;
	children: React.ReactNode;
}) => {
	const { dismiss } = useDismissible(id);

	return (
		<span
			onClick={() => {
				dismiss(days);
			}}
		>
			{children}
		</span>
	);
};

export const Dismissible = ({
	id,
	defaultDisplay,
	children,
}: {
	id: string;
	defaultDisplay?: CSSProperties["display"];
	children: React.ReactNode;
}) => {
	const [loaded, setLoaded] = useState(false);
	const store = useStore(dismissedMap);

	useEffect(() => {
		setIsDismissed(id, loadInitialValue(id));
		setLoaded(true);
	}, []);

	return (
		<span
			style={{
				display: !loaded ? defaultDisplay : store[id] ? "none" : undefined,
			}}
		>
			{children}
		</span>
	);
};
