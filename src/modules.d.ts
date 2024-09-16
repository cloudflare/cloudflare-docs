declare module "astro-live-code" {
	type LiveCodeOptions = {
		layout?: string;
		wrapper?: string;
		defaultProps?: Record<string, any>;
	};
	export default function AstroLiveCode(
		options?: LiveCodeOptions,
	): import("astro").AstroIntegration;
}
