import { z, type ZodEnum } from "astro/zod";

export function zodEnumFromObjKeys<K extends string>(
	obj: Record<K, any>,
): ZodEnum<[K, ...K[]]> {
	const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
	return z.enum([firstKey, ...otherKeys]);
}
