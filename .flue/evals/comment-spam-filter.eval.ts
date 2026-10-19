import { expect } from "vitest";
import { describeEval } from "vitest-evals";
import { createClefHarness } from "./clef-harness";
import type { SpamVerdict } from "../lib/clef";
import type { CommentSpamContext } from "../lib/comment-spam";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createClefHarness<CommentSpamContext>({
	baseUrl,
	kind: "comment",
	token,
});

type Verdict = SpamVerdict;

const parent = {
	kind: "pull_request" as const,
	number: 33664,
	title: "Update Pages docs",
	state: "closed",
	url: "https://github.com/cloudflare/cloudflare-docs/pull/33664",
	body: "Rewrites the Pages build configuration docs.",
	author: "docs-writer",
};

describeEval("comment spam gate (clef)", { harness }, (it) => {
	it("flags an obvious link-drop spam comment", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809326,
				body: "Nice post! Check out http://spam-site.example/ for the best casino bonuses and free crypto. Limited time offer!!!",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809326",
				author: "promo-user-99",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(true);
		expect(verdict.confidence).toBe("high");
	});

	it("flags bot-flood gibberish", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809327,
				body: "asdf asdf CLICK asdf http://junk.example asdf SEO asdf backlinks asdf",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/42#issuecomment-5818809327",
				author: "junk-flood-01",
				author_association: "NONE",
			},
			parent: {
				...parent,
				kind: "issue" as const,
				number: 42,
				title: "Docs feedback thread",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/42",
			},
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(true);
		expect(verdict.confidence).toBe("high");
	});

	it("never flags a support question posted as a comment", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809328,
				body: "Sorry to hijack this PR, but does anyone know if Pages supports monorepos? I can't find it in the docs and my build keeps failing.",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809328",
				author: "confused-dev",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(false);
	});

	it("never flags short reactions like +1 or thanks", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809329,
				body: "+1 this fixed the exact problem I was having, thanks!",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809329",
				author: "happy-reader",
				author_association: "CONTRIBUTOR",
			},
			parent,
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(false);
	});

	it("flags an email-reply artifact", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809330,
				body: "Confirm Approved\n\nOn Tue, Sep 30, 2026 at 10:02 AM github-actions[bot] <notifications@github.com> wrote:\n\n> Please confirm the preview looks right.\n\n--\nReply to this email directly, view it on GitHub, or unsubscribe.\nYou are receiving this because you were mentioned.\nMessage ID: <cloudflare/cloudflare-docs/pull/33664/c5818809330@github.com>",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809330",
				author: "emailing-user",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict.is_spam).toBe(true);
		expect(verdict.confidence).toBe("high");
	});

	it("does not flag an email reply with a real question", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809331,
				body: "Thanks, but the build command in your example is wrong: Pages needs `npm run build`, not `npm build`. Should the docs be corrected?\n\nOn Tue, Sep 30, 2026 at 10:02 AM docs-writer <notifications@github.com> wrote:\n\n> Rewrites the Pages build configuration docs.\n\n--\nReply to this email directly, view it on GitHub, or unsubscribe.\nYou are receiving this because you commented.\nMessage ID: <cloudflare/cloudflare-docs/pull/33664/c5818809331@github.com>",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809331",
				author: "careful-reader",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict.is_spam).toBe(false);
	});
});
