import type { WorkersAIModelsSchema } from "~/schemas";
import type { ResolvedModel } from "~/util/model-types";

type ModelType = WorkersAIModelsSchema | ResolvedModel;

const ModelFeatures = ({ model }: { model: ModelType }) => {
	const nf = new Intl.NumberFormat("en-US");
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 10,
	});
	const properties: any = {};
	model.properties.forEach((property: any) => {
		properties[property.property_id] = property.value;
	});

	// For catalog models, build a dashboard deep link for pricing.
	// model_id format is "provider/name" (e.g. "pixverse/v6"), mapped to
	// https://dash.cloudflare.com/?to=/:account/ai/models/provider/name
	const isCatalog =
		"dataSource" in model && (model as ResolvedModel).dataSource === "catalog";
	const dashPricingUrl = isCatalog
		? `https://dash.cloudflare.com/?to=/:account/ai/models/${(model as ResolvedModel).modelId}`
		: null;

	// `requestFormats` lives directly on ResolvedModel (catalog-only) rather
	// than the legacy `properties` array because Property.value is a string
	// and we need to preserve the original list. Format identifiers like
	// "chat-completions" are title-cased for display.
	const requestFormats = isCatalog
		? ((model as ResolvedModel).requestFormats ?? null)
		: null;
	const formatRequestFormat = (format: string) =>
		format
			.split(/[-_]/)
			.map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
			.join(" ");

	return (
		<>
			{Object.keys(properties).length ? (
				<>
					<table>
						<thead>
							<tr>
								<>
									<th>Model Info</th>
									<th />
								</>
							</tr>
						</thead>
						<tbody>
							{properties.planned_deprecation_date && (
								<tr>
									<td>
										{Date.now() >
										Math.floor(
											new Date(properties.planned_deprecation_date).getTime(),
										)
											? "Deprecated"
											: "Planned Deprecation"}
									</td>
									<td>
										{new Date(
											properties.planned_deprecation_date,
										).toLocaleDateString("en-US")}
									</td>
								</tr>
							)}
							{properties.context_window && (
								<tr>
									<td>
										Context Window
										<a href="/workers-ai/glossary/">
											<span className="external-link"> ↗</span>
										</a>
									</td>
									<td>{nf.format(properties.context_window)} tokens</td>
								</tr>
							)}
							{properties.terms && (
								<tr>
									<td>Terms and License</td>
									<td>
										<a href={properties.terms} target="_blank">
											link<span className="external-link"> ↗</span>
										</a>
									</td>
								</tr>
							)}
							{properties.info && (
								<tr>
									<td>More information</td>
									<td>
										<a href={properties.info} target="_blank">
											link<span className="external-link"> ↗</span>
										</a>
									</td>
								</tr>
							)}
							{properties.max_input_tokens && (
								<tr>
									<td>Maximum Input Tokens</td>
									<td>{nf.format(properties.max_input_tokens)}</td>
								</tr>
							)}
							{properties.output_dimensions && (
								<tr>
									<td>Output Dimensions</td>
									<td>{nf.format(properties.output_dimensions)}</td>
								</tr>
							)}
							{properties.function_calling && (
								<tr>
									<td>
										Function calling{" "}
										<a href="/workers-ai/function-calling">
											<span className="external-link"> ↗</span>
										</a>
									</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.reasoning && (
								<tr>
									<td>Reasoning</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.vision && (
								<tr>
									<td>Vision</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.zdr && (
								<tr>
									<td>Zero data retention</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.lora && (
								<tr>
									<td>LoRA</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.beta && (
								<tr>
									<td>Beta</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.async_queue && (
								<tr>
									<td>Batch</td>
									<td>Yes</td>
								</tr>
							)}
							{requestFormats && requestFormats.length > 0 && (
								<tr>
									<td>Request formats</td>
									<td>{requestFormats.map(formatRequestFormat).join(", ")}</td>
								</tr>
							)}
							{properties.partner && (
								<tr>
									<td>Partner</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.realtime && (
								<tr>
									<td>Real-time</td>
									<td>Yes</td>
								</tr>
							)}
							{properties.price && properties.price.length > 0 && (
								<tr>
									<td>Unit Pricing</td>
									<td>
										{properties.price
											.map(
												(price: { price: number; unit: string }) =>
													`${currencyFormatter.format(price.price)} ${price.unit}`,
											)
											.join(", ")}
									</td>
								</tr>
							)}
							{dashPricingUrl && (
								<tr>
									<td>Pricing</td>
									<td>
										<a href={dashPricingUrl} target="_blank" rel="noreferrer">
											View pricing in the Cloudflare dashboard
											<span className="external-link"> ↗</span>
										</a>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</>
			) : (
				false
			)}
		</>
	);
};

export default ModelFeatures;
