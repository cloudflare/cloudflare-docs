import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "89084aadb14349d721c49526c27ae046e676a074";
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
