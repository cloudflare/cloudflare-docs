import { ACTION_VERBS } from "./constants";
import type {
	ActionItem,
	ComponentUsage,
	FileReviewResult,
	ReviewIssue,
} from "./types";

/**
 * Extracts the product area from a file path
 * e.g., "src/content/docs/workers/..." -> "workers"
 */
export function extractProductArea(filePath: string): string | null {
	const match = filePath.match(/src\/content\/docs\/([^/]+)/);
	return match ? match[1] : null;
}

/**
 * Detects action items in the document content
 * Actions are identified by headers and procedural content
 */
export function detectActions(content: string): ActionItem[] {
	const actions: ActionItem[] = [];
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineNumber = i + 1;

		// Check for headers that describe actions (## or ###)
		const headerMatch = line.match(/^#{2,3}\s+(.+)$/);
		if (headerMatch) {
			const headerText = headerMatch[1].toLowerCase();
			const actionType = identifyActionType(headerText);

			if (actionType) {
				actions.push({
					name: headerMatch[1],
					line: lineNumber,
					actionType,
					hasApiExample: false, // Will be updated later
				});
			}
		}

		// Check for numbered list items that describe actions
		const listMatch = line.match(/^\d+\.\s+(.+)$/);
		if (listMatch) {
			const listText = listMatch[1].toLowerCase();
			// Only capture if it looks like a primary action step
			if (
				listText.includes("select **create") ||
				listText.includes("select **add") ||
				listText.includes("select **delete") ||
				listText.includes("select **save")
			) {
				// This is likely a dashboard instruction, check if parent section needs API
				// We'll handle this differently - look for the parent header
			}
		}
	}

	return actions;
}

/**
 * Identifies the action type from text
 */
function identifyActionType(text: string): ActionItem["actionType"] | null {
	const lowerText = text.toLowerCase();

	for (const [actionType, verbs] of Object.entries(ACTION_VERBS)) {
		for (const verb of verbs) {
			if (lowerText.includes(verb)) {
				return actionType as ActionItem["actionType"];
			}
		}
	}

	return null;
}

/**
 * Detects API-related components in the content
 */
export function detectComponents(content: string): ComponentUsage[] {
	const components: ComponentUsage[] = [];
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineNumber = i + 1;

		// Check for <APIRequest> component
		if (line.includes("<APIRequest")) {
			const pathMatch = content
				.slice(content.indexOf(line))
				.match(/path=["']([^"']+)["']/);
			const methodMatch = content
				.slice(content.indexOf(line))
				.match(/method=["']([^"']+)["']/);

			components.push({
				type: "APIRequest",
				line: lineNumber,
				path: pathMatch?.[1],
				method: methodMatch?.[1],
				hasSchemaValidation: true,
			});
		}

		// Check for <CURL> component
		if (line.includes("<CURL") && !line.includes("<CURL>")) {
			const urlMatch = content
				.slice(content.indexOf(line))
				.match(/url=["']([^"']+)["']/);
			const methodMatch = content
				.slice(content.indexOf(line))
				.match(/method=["']([^"']+)["']/);

			components.push({
				type: "CURL",
				line: lineNumber,
				path: urlMatch?.[1],
				method: methodMatch?.[1],
				hasSchemaValidation: false,
			});
		}

		// Check for <Tabs> component
		if (line.includes("<Tabs")) {
			components.push({
				type: "Tabs",
				line: lineNumber,
			});
		}

		// Check for raw curl in bash blocks
		if (line.includes("```bash")) {
			// Look ahead for curl command
			let j = i + 1;
			while (j < lines.length && !lines[j].includes("```")) {
				if (lines[j].trim().startsWith("curl ")) {
					components.push({
						type: "rawCurl",
						line: j + 1,
					});
					break;
				}
				j++;
			}
		}
	}

	return components;
}

/**
 * Checks for common style guide issues
 */
export function checkStyleGuide(content: string): ReviewIssue[] {
	const issues: ReviewIssue[] = [];
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineNumber = i + 1;

		// Check for title case in headers (should be sentence case)
		const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
		if (headerMatch) {
			const headerText = headerMatch[2];
			// Simple heuristic: if most words are capitalized, it might be title case
			const words = headerText.split(/\s+/);
			const capitalizedWords = words.filter(
				(w) => w.length > 3 && w[0] === w[0].toUpperCase(),
			);
			if (capitalizedWords.length > words.length * 0.7 && words.length > 2) {
				issues.push({
					severity: "warning",
					message: `Header may be using title case instead of sentence case`,
					line: lineNumber,
					suggestion:
						"Use sentence case for headers (capitalize only the first word)",
				});
			}
		}

		// Check for missing imports when using components
		if (
			line.includes("<APIRequest") &&
			!content.includes("import { APIRequest") &&
			!content.includes("import {APIRequest")
		) {
			// Only flag once per file
			if (
				!issues.some((issue) => issue.message.includes("APIRequest import"))
			) {
				issues.push({
					severity: "error",
					message: "Missing import for APIRequest component",
					line: lineNumber,
					suggestion: 'Add: import { APIRequest } from "~/components";',
				});
			}
		}

		if (
			line.includes("<CURL") &&
			!content.includes("import { CURL") &&
			!content.includes("import {CURL") &&
			!content.includes(", CURL") &&
			!content.includes(",CURL")
		) {
			if (!issues.some((issue) => issue.message.includes("CURL import"))) {
				issues.push({
					severity: "error",
					message: "Missing import for CURL component",
					line: lineNumber,
					suggestion: 'Add: import { CURL } from "~/components";',
				});
			}
		}

		// Check for Tabs without syncKey
		if (line.includes("<Tabs") && !line.includes("syncKey")) {
			issues.push({
				severity: "warning",
				message: "Tabs component missing syncKey attribute",
				line: lineNumber,
				suggestion: 'Add syncKey="dashPlusAPI" for Dashboard/API tabs',
			});
		}
	}

	return issues;
}

/**
 * Checks for JSX syntax issues
 */
export function checkJsxSyntax(content: string): ReviewIssue[] {
	const issues: ReviewIssue[] = [];
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineNumber = i + 1;

		// Check for unclosed self-closing tags
		if (
			line.includes("<APIRequest") &&
			!line.includes("/>") &&
			!line.includes("</APIRequest")
		) {
			// Look ahead for closing
			let foundClose = false;
			for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
				if (lines[j].includes("/>") || lines[j].includes("</APIRequest")) {
					foundClose = true;
					break;
				}
			}
			if (!foundClose) {
				issues.push({
					severity: "error",
					message: "APIRequest component may not be properly closed",
					line: lineNumber,
					suggestion: "Ensure the component ends with /> or </APIRequest>",
				});
			}
		}

		// Check for object props with single braces instead of double
		const singleBraceMatch = line.match(/json=\{[^{]/);
		if (singleBraceMatch && !line.includes("json={{")) {
			issues.push({
				severity: "error",
				message: "Object prop should use double braces",
				line: lineNumber,
				suggestion: "Use json={{ ... }} instead of json={ ... }",
			});
		}
	}

	return issues;
}

/**
 * Associates detected actions with API components
 */
export function associateActionsWithComponents(
	actions: ActionItem[],
	components: ComponentUsage[],
	content: string,
): ActionItem[] {
	const lines = content.split("\n");

	return actions.map((action) => {
		// Find the next header or end of file
		let endLine = lines.length;
		for (let i = action.line; i < lines.length; i++) {
			if (lines[i].match(/^#{2,3}\s+/) && i !== action.line - 1) {
				endLine = i + 1;
				break;
			}
		}

		// Check if any API component exists between action and next header
		const hasApiComponent = components.some(
			(comp) =>
				comp.line >= action.line &&
				comp.line < endLine &&
				(comp.type === "APIRequest" || comp.type === "CURL"),
		);

		return {
			...action,
			hasApiExample: hasApiComponent,
		};
	});
}

/**
 * Calculate a score for the file review
 */
export function calculateScore(result: FileReviewResult): number {
	let score = 100;

	// Deduct for errors
	const errors = result.issues.filter((i) => i.severity === "error");
	score -= errors.length * 10;

	// Deduct for warnings
	const warnings = result.issues.filter((i) => i.severity === "warning");
	score -= warnings.length * 5;

	// Deduct for missing API examples where API is available
	score -= result.summary.actionsMissingApiAvailable * 5;

	// Deduct for raw curl commands
	score -= result.summary.rawCurlCommands * 3;

	// Bonus for using Tabs
	if (result.summary.hasTabsIntegration) {
		score += 5;
	}

	return Math.max(0, Math.min(100, score));
}

/**
 * Main function to analyze a single file
 */
export function analyzeFile(
	filePath: string,
	content: string,
): FileReviewResult {
	const relativePath = filePath.replace(/.*src\/content\//, "src/content/");

	// Detect actions and components
	const actions = detectActions(content);
	const components = detectComponents(content);

	// Associate actions with their API examples
	const enrichedActions = associateActionsWithComponents(
		actions,
		components,
		content,
	);

	// Collect all issues
	const issues: ReviewIssue[] = [
		...checkStyleGuide(content),
		...checkJsxSyntax(content),
	];

	// Add warnings for raw curl commands
	const rawCurls = components.filter((c) => c.type === "rawCurl");
	for (const rawCurl of rawCurls) {
		issues.push({
			severity: "warning",
			message: "Raw curl command in bash block should be refactored",
			line: rawCurl.line,
			suggestion:
				"Use <APIRequest> (if schema available) or <CURL> component instead",
		});
	}

	// Add suggestions for actions missing API examples
	const actionsMissingApi = enrichedActions.filter((a) => !a.hasApiExample);
	for (const action of actionsMissingApi) {
		issues.push({
			severity: "suggestion",
			message: `Action "${action.name}" may benefit from an API example`,
			line: action.line,
			suggestion: `Consider adding an <APIRequest> or <CURL> component for the ${action.actionType} operation`,
		});
	}

	// Calculate summary
	const summary = {
		actionsFound: enrichedActions.length,
		actionsWithApi: enrichedActions.filter((a) => a.hasApiExample).length,
		actionsMissingApiAvailable: actionsMissingApi.filter(
			(a) => a.apiEndpointAvailable,
		).length,
		actionsMissingApiUnavailable: actionsMissingApi.filter(
			(a) => !a.apiEndpointAvailable,
		).length,
		rawCurlCommands: rawCurls.length,
		hasTabsIntegration: components.some((c) => c.type === "Tabs"),
	};

	// Determine if file has API-related content
	// A file has API content if it contains APIRequest, CURL components, or raw curl commands
	const apiComponents = components.filter(
		(c) => c.type === "APIRequest" || c.type === "CURL" || c.type === "rawCurl",
	);
	const hasApiContent = apiComponents.length > 0;

	const result: FileReviewResult = {
		filePath,
		relativePath,
		actions: enrichedActions,
		components,
		issues,
		score: 0,
		hasApiContent,
		summary,
	};

	result.score = calculateScore(result);

	return result;
}
