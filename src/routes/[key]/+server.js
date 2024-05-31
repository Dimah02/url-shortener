// @ts-nocheck
import { getUrlByKey, updateUrlCount } from "$lib/db/services";


export const GET = async ({ params }) => {
    const { key } = params;
    try {
        const url = await getUrlByKey(key);
        if (!url) {
            return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404 });
        }
        await updateUrlCount(url.id);
        return new Response(null, {
            status: 302,
            headers: {
                'Location': url.longurl
            }
        });
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
