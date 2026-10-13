declare global {
	interface Window {
		zaraz?: {
			track: Track;
		};
	}
}

type Track = (event: string, properties?: Record<string, any>) => void;

export const track: Track = (event, properties) => {
	if (!window.zaraz) {
		console.log("zaraz.track:", event, properties);
		return;
	}

	window.zaraz.track(event, properties);
};
