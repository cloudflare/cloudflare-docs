import { getCollection } from "astro:content";

export async function GET() {
    const entries = await getCollection("pages-build-environment");

    const data = entries.flatMap(x => {
        x.data.enable_date = new Date(x.data.enable_date).toISOString();

        x.data.status ??= null;
        
        return x.data
    });

    return Response.json(data);
}