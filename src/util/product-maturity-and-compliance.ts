import { getEntry } from "astro:content";

export async function getProductMaturityAndCompliance(productName: string) {
	const entry = await getEntry("product-maturity-and-compliance", "index");

	if (!entry) {
		throw new Error(
			`[ProductMaturityAndCompliance] Failed to load product maturity and compliance JSON.`,
		);
	}

	const product = entry.data.find(
		(p: { name: string }) => p.name === productName,
	);

	if (!product) {
		throw new Error(
			`[ProductMaturityAndCompliance] Failed to find ${productName} in product maturity and compliance JSON.`,
		);
	}

	return product.maturity;
}
