import { JsonSchemaViewer } from "cf-json-schema-viz";
import "cf-json-schema-viz/styles.css";

interface Props {
	schema: Record<string, unknown>;
}

export default function JsonSchemaViewerWrapper({ schema }: Props) {
	return (
		<div
			style={{
				border: "1px solid var(--sl-color-gray-6)",
				borderRadius: "0.5rem",
				backgroundColor: "var(--sl-color-bg)",
			}}
		>
			<JsonSchemaViewer
				schema={schema}
				defaultExpandedDepth={2}
				maxHeight={512}
			/>
		</div>
	);
}
