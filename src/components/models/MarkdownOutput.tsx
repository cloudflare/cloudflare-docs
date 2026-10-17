/**
 * Renders a model's text output as Markdown at build time. Raw HTML in the
 * output is escaped (react-markdown's default), so it never becomes markup.
 */
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownOutput({ text }: { text: string }) {
	return (
		<div className="example-markdown">
			<Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
		</div>
	);
}
