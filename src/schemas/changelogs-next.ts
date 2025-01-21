import { reference } from "astro:content";
import { z } from "astro:schema";

export const changelogsNextSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	products: z.array(reference("products")),
});
