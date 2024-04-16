// @ts-nocheck
import { mysqlconnFn } from "$lib/db/mysql";

export const GET = async ({ params }) => {
    const { key } = params;
    let mysqlconn = mysqlconnFn();
    try {
        let [rows] = await mysqlconn.query(`SELECT * FROM url WHERE shorturl = ?`, [key]);
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Not Found' }));
        }

        const url = rows[0].longurl;
        console.log(rows[0].count)
        await mysqlconn.query( `UPDATE url SET count = ${rows[0].count+1} WHERE id = ${rows[0].id}`);

        return new Response(null, {
            status: 302,
            headers: {
                'Location': url
            }
        });
    }
    catch (err) {
        console.error("Got an error!!!");
        console.log(err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
