import { rehype } from "rehype";
import type { PluggableList } from "unified";

export async function process(html: string, plugins: PluggableList) {
	const file = await rehype()
		.data("settings", {
			fragment: true,
		})
		.use(plugins)
		.process(html);

	return file.toString();
}
