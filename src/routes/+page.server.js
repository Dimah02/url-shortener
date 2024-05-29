// @ts-nocheck
import { fail } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */




export async function load({ fetch }) {
    const fetchUrls = async () => {
        const res = await fetch('/api/url');
        const data = await res.json();
        return data.data;
    }
    return {
        data: await fetchUrls(),
    }
}


export const actions = {
    create: async ({ request, fetch }) => {
        try {
            const data = await request.formData();
            const url = data.get('url');
            const key = data.get('key');
            const res = await fetch('/api/url', {
                method: "POST",
                body: JSON.stringify({ url, key })
            });
            if (res.status == 200) {
                return { success: true };
            }
            else {
                return fail(400, { error: true, message: "key is already exist", url, key });
            }
        } catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }
    },
    delete: async ({ request, fetch }) => {
        try {
            const data = await request.formData();
            const id = data.get('id');
            const res = await fetch('/api/url', {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            return { success: true };
        } catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }
    }
};