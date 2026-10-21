import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";
import { fetchGitHubFile } from "./github-code";

const COMMIT = "f2d02fb4dd06ca2cf7d158c63b11dc8a4675d21a";
let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		const response = await fetchGitHubFile(
			"cloudflare/api-schemas",
			COMMIT,
			"openapi.json",
		);
		const obj = await response.json();

		schema = await SwaggerParser.dereference(obj);
	}

	return schema;
};
