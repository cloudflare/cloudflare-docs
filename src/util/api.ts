import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "c61688690b0c986035b46e311f01ed837f3ba203";
let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		const response = await fetch(
			`https://gh-code.developers.cloudflare.com/cloudflare/api-schemas/${COMMIT}/openapi.json`,
		);
		const obj = await response.json();

		schema = await SwaggerParser.dereference(obj);
	}

	return schema;
};
