import { readFile } from "node:fs/promises";
import { normalizeText, truncateText } from "../shared";

export async function readJsonFile(path: string): Promise<unknown | undefined> {
	try {
		return JSON.parse(await readFile(path, "utf8")) as unknown;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
		throw error;
	}
}

export function asRecord(value: unknown): Record<string, unknown> | undefined {
	return value && typeof value === "object" && !Array.isArray(value)
		? (value as Record<string, unknown>)
		: undefined;
}

export function asString(value: unknown) {
	return typeof value === "string" ? value : undefined;
}

export function asArray(value: unknown) {
	return Array.isArray(value) ? value : [];
}

export function compactLine(label: string, value: unknown) {
	if (value === undefined || value === null || value === "") return undefined;
	if (Array.isArray(value) && value.length === 0) return undefined;
	return `${label}: ${Array.isArray(value) ? value.join(", ") : String(value)}`;
}

export function excerpt(value: unknown, maxLength = 800): string | undefined {
	if (value === undefined || value === null) return undefined;
	let text: string;
	if (typeof value === "string") text = value;
	else if (Array.isArray(value)) {
		text = value
			.map((item) => (typeof item === "string" ? item : undefined))
			.filter(Boolean)
			.join("");
	} else {
		text = JSON.stringify(value);
	}
	const normalized = normalizeText(text.replace(/<[^>]+>/g, ""));
	return normalized ? truncateText(normalized, maxLength) : undefined;
}
