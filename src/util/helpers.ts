import { z, type ZodEnum } from "astro/zod";

export function zodEnumFromObjKeys<K extends string>(
	obj: Record<K, any>,
): ZodEnum<[K, ...K[]]> {
	const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
	return z.enum([firstKey, ...otherKeys]);
}

export function formatBytes(bytes: number, decimals?: number) {
	if (bytes == 0) return "0 Bytes";
	const k = 1024,
		dm = decimals || 2,
		sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
