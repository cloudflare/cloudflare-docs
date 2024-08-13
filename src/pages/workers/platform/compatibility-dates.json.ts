import { getCollection } from "astro:content";

export async function GET() {
    const entries = await getCollection("compatibility-dates");
    
    entries.sort((a, b) => a.data.sort_date - b.data.sort_date)

    const flags = entries.flatMap((x) => {
        delete x.data.sort_date;
        
        if (!x.data.enable_flag) {
            x.data.enable_flag = null
        };

        if (!x.data.enable_date) {
            x.data.enable_date = null
        }

        if (!x.data.disable_flag) {
            x.data.disable_flag = null
        }

        return {
            ...x.data,
            description: x.body.trim(),
            experimental: x.data.experimental ?? false
        }
    });

    return Response.json(flags);
}