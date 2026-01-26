export const GITHUB_ACTIONS_BOT_ID = 41898282;

export const COMMENT_PREFIX = "## API Documentation Review";

export const COMMENT_IDENTIFIER = "<!-- api-docs-review-bot -->";

// Action verbs that indicate CRUD operations
export const ACTION_VERBS = {
	create: ["create", "add", "new", "set up", "configure", "enable", "generate"],
	update: ["update", "modify", "edit", "change", "patch"],
	delete: ["delete", "remove", "disable"],
	read: ["list", "view", "get", "show", "display", "retrieve", "fetch"],
	other: ["export", "download", "upload", "import"],
} as const;

// HTTP method mapping for action types
export const ACTION_TO_METHOD: Record<string, string[]> = {
	create: ["POST"],
	update: ["PUT", "PATCH"],
	delete: ["DELETE"],
	read: ["GET"],
	other: ["GET", "POST"],
};

// Component patterns to detect in MDX files
export const COMPONENT_PATTERNS = {
	apiRequest: /<APIRequest\s/g,
	curl: /<CURL\s/g,
	tabs: /<Tabs\s/g,
	tabItem: /<TabItem\s/g,
	bashCurl: /```bash\s*\n[^`]*curl\s+/g,
};

// Paths that indicate documentation content
export const DOCS_CONTENT_PATH = "src/content/docs/";
export const PARTIALS_PATH = "src/content/partials/";
