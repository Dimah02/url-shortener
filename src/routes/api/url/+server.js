import { mysqlconnFn } from "$lib/db/mysql";

export const GET = async () => {
    let mysqlconn = mysqlconnFn();

    try {

        let [rows] = await mysqlconn.query("SELECT * FROM url");

        return new Response(JSON.stringify({ data: rows }), { status: 200 });

    } catch (error) {

        console.error("Got an error!!!");

        console.log(error);

        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
}

// @ts-ignore
export const POST = async ({ request }) => {
    let mysqlconn = mysqlconnFn();

    try {
        const body = await request.json();
        const url = body.url;
        const key = body.key;
        console.log(url)
        let [rows] = await mysqlconn.query(`SELECT * FROM url WHERE shorturl = ?`, [key]);
        if (rows.length == 0) {
            await mysqlconn.query(`
                INSERT INTO url (longurl, shorturl)
                VALUES (?,?)
                `, [url, key])
            return new Response(JSON.stringify({ message: "URL successfully added" }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ message: "Key is already exist" }), { status: 400 });
        }
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
}

// @ts-ignore
export const DELETE = async ({ request }) => {
    let mysqlconn = mysqlconnFn();
    try {
        const body = await request.json();
        const id = body.id;
        await mysqlconn.query(`DELETE FROM url WHERE id = ?`, [id]);
        return new Response(JSON.stringify({ message: "URL successfully deleted" }), { status: 200 });
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return new Response(JSON.stringify({ message: "something went wrong" }), { status: 500 });
    }
}
