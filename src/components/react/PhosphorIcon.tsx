// Renders a Phosphor icon inside a React island. astro-icon's <Icon> is
// Astro-only, so React islands can't use it directly — this resolves icon
// data from the already-installed @iconify-json/ph set at runtime (cheap,
// synchronous, no network fetch) via the same @iconify/utils helpers already
// used for build-time icon resolution in src/pages/directory.astro.
import { getIconData, iconToSVG } from "@iconify/utils";
import phIcons from "@iconify-json/ph/icons.json";

interface Props {
	/** Icon name from the Phosphor set, e.g. "thumbs-up", "magnifying-glass". */
	name: string;
	className?: string;
}

const cache = new Map<string, { viewBox: string; body: string }>();

function resolve(name: string) {
	let entry = cache.get(name);
	if (!entry) {
		const data = getIconData(phIcons, name);
		if (!data) {
			throw new Error(`PhosphorIcon: unknown icon "${name}"`);
		}
		const { attributes, body } = iconToSVG(data);
		entry = { viewBox: String(attributes.viewBox), body };
		cache.set(name, entry);
	}
	return entry;
}

export default function PhosphorIcon({ name, className }: Props) {
	const { viewBox, body } = resolve(name);
	return (
		<svg
			viewBox={viewBox}
			fill="currentColor"
			aria-hidden
			className={className}
			dangerouslySetInnerHTML={{ __html: body }}
		/>
	);
}
