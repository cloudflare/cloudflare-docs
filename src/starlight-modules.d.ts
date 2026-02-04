// Type declarations for Starlight virtual component modules
// These modules are provided by Starlight at build time via Vite virtual modules

declare module "virtual:starlight/components/EditLink" {
	const EditLink: typeof import("@astrojs/starlight/components/EditLink.astro").default;
	export default EditLink;
}

declare module "virtual:starlight/components/LastUpdated" {
	const LastUpdated: typeof import("@astrojs/starlight/components/LastUpdated.astro").default;
	export default LastUpdated;
}

declare module "virtual:starlight/components/Pagination" {
	const Pagination: typeof import("@astrojs/starlight/components/Pagination.astro").default;
	export default Pagination;
}
