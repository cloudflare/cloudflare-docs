// Re-export production's DocSearch client options + live index resolver so
// search behavior stays 1:1. Relative path because Nimbus remaps `~`.
export {
	default as docSearchOptions,
	getIndexName,
} from "../../../../plugins/docsearch";
