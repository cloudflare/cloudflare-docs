// Computes the Worker Preview name for a branch. Shared by the preview deploy
// and cleanup workflows so both always target the same Preview.
//
// The `gh-` prefix keeps these Previews separate from the ones Workers Builds
// creates on the same Worker (which are named after the bare branch slug).
// A branch whose slug itself starts with `gh-` (e.g. `gh-foo`) can still share
// a name with this workflow's Preview for another branch (`foo`) in Workers
// Builds, because a slug can't be told apart from a prefixed name.

const PREFIX = "gh-";
// A DNS label is at most 63 characters.
const MAX_LENGTH = 63;

function slugifyBranch(branch: string): string {
	return branch
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.toLowerCase();
}

export function getWorkerPreviewName(branch: string): string {
	// Don't strip a leading `gh-` from the branch: that would map `gh-foo` and
	// `foo` to the same Preview and make two PRs overwrite each other.
	return `${PREFIX}${slugifyBranch(branch)}`
		.slice(0, MAX_LENGTH)
		.replace(/-+$/, "");
}
