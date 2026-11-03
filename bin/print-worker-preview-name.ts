// Prints the Worker Preview name for a branch. Used by the preview deploy and
// cleanup workflows so both always target the same Preview.
import { getWorkerPreviewName } from "./worker-preview-name";

const branch = process.argv[2];

if (!branch) {
	console.error("Usage: print-worker-preview-name.ts <branch>");
	process.exit(1);
}

console.log(getWorkerPreviewName(branch));
