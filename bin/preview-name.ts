// Computes the Worker Preview name for a branch. Shared by the preview deploy
// and cleanup workflows so both always target the same Preview.
//
// The `gh-` prefix keeps these Previews separate from the ones Workers Builds
// creates on the same Worker (which are named after the bare branch slug).

const PREFIX = "gh-";
// A DNS label is at most 63 characters.
const MAX_LENGTH = 63;

export function branchSlug(branch: string): string {
	return branch
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.toLowerCase();
}

export function previewName(branch: string): string {
	// Strip an existing prefix so a branch named `gh-foo` can't collide with
	// the Preview for branch `foo`.
	const slug = branchSlug(branch).replace(/^(gh-)+/, "");
	return `${PREFIX}${slug}`.slice(0, MAX_LENGTH).replace(/-+$/, "");
}

if (process.argv[1]?.endsWith("preview-name.ts")) {
	const branch = process.argv[2];
	if (!branch) {
		console.error("Usage: preview-name.ts <branch>");
		process.exit(1);
	}
	console.log(previewName(branch));
}
