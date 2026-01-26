export interface CurlCommand {
	line: number;
	method: string;
	path: string;
	fullUrl: string;
	rawCommand: string;
	hasSchemaEndpoint: boolean;
}

export interface FileReviewResult {
	filePath: string;
	relativePath: string;
	curlCommands: CurlCommand[];
}

export interface ReviewReport {
	files: FileReviewResult[];
	totalCurlCommands: number;
	totalWithSchemaEndpoint: number;
}
