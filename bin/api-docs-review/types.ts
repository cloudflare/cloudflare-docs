export type Severity = "error" | "warning" | "suggestion" | "info";

export interface ReviewIssue {
	severity: Severity;
	message: string;
	line?: number;
	suggestion?: string;
	endpoint?: string;
	apiReference?: string;
}

export interface ActionItem {
	name: string;
	line: number;
	actionType: "create" | "update" | "delete" | "read" | "other";
	hasApiExample: boolean;
	apiEndpointAvailable?: boolean;
	suggestedEndpoint?: string;
	suggestedMethod?: string;
	apiReference?: string;
}

export interface ComponentUsage {
	type: "APIRequest" | "CURL" | "Tabs" | "rawCurl";
	line: number;
	path?: string;
	method?: string;
	hasSchemaValidation?: boolean;
}

export interface FileReviewResult {
	filePath: string;
	relativePath: string;
	actions: ActionItem[];
	components: ComponentUsage[];
	issues: ReviewIssue[];
	score: number;
	hasApiContent: boolean;
	summary: {
		actionsFound: number;
		actionsWithApi: number;
		actionsMissingApiAvailable: number;
		actionsMissingApiUnavailable: number;
		rawCurlCommands: number;
		hasTabsIntegration: boolean;
	};
}

export interface ReviewReport {
	files: FileReviewResult[];
	hasApiContent: boolean;
	summary: {
		totalFiles: number;
		totalErrors: number;
		totalWarnings: number;
		totalSuggestions: number;
		averageScore: number;
		totalActionsFound: number;
		totalActionsWithApi: number;
		totalActionsMissingApi: number;
	};
}
