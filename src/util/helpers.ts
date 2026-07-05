import { z } from "astro/zod";

export function zodEnumFromObjKeys<T extends Record<string, any>>(obj: T) {
	type Keys = keyof T & string;
	const keys = Object.keys(obj) as [Keys, ...Keys[]];
	return z.enum(keys);
}

export function formatBytes(bytes: number, decimals?: number) {
	if (bytes == 0) return "0 Bytes";
	const k = 1024,
		dm = decimals || 2,
		sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
