import type { WorkersAIModelsSchema } from "~/schemas";

const ModelFeatures = ({ model }: { model: WorkersAIModelsSchema }) => {
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
											new Date(properties.planned_deprecation_date).getTime() /
												1000,
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
