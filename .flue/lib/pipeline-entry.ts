import type { WebhookClassification } from "./webhook-classify";

export type PipelineEnv = Env;

/** Ingress only durably admits work. Authorization runs in the Workflow. */
export async function startReviewPipeline(
	env: Env,
	classification: WebhookClassification,
	delivery: string,
): Promise<void> {
	const id = delivery || crypto.randomUUID();
	try {
		await env.INGEST.create({ id, params: { classification, delivery: id } });
	} catch (error) {
		const existing = await env.INGEST.get(id);
		try {
			if ((await existing.status()).status === "unknown") throw error;
		} catch {
			throw error;
		}
	}
}
