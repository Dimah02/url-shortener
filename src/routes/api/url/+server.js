// @ts-nocheck
import { getAllUrls, addUrl, deleteUrl } from "$lib/db/services";

export const GET = async () => {
    try {
        const urls = await getAllUrls();
        return new Response(JSON.stringify({ data: urls }), { status: 200 });
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
};

export const POST = async ({ request }) => {
    try {
        const body = await request.json();
        const url = body.url;
        const key = body.key;
        const message = await addUrl(url, key);
        return new Response(JSON.stringify({ message }), { status: 200 });
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        let message = "something went wrong";
        if (error.message === "Key already exists") {
            message = "Key is already exist";
        }
        return new Response(JSON.stringify({ message }), { status: 400 });
    }
};


export const DELETE = async ({ request }) => {
    try {
        const body = await request.json();
        const id = body.id;
        const message = await deleteUrl(id);
        return new Response(JSON.stringify({ message }), { status: 200 });
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
};
