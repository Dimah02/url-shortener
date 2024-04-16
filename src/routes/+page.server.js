// @ts-nocheck
import { fail } from '@sveltejs/kit';
import { mysqlconnFn } from "$lib/db/mysql";
/** @type {import('./$types').Actions} */




export async function load() {
    let mysqlconn = mysqlconnFn();
    try {
        let [rows] = await mysqlconn.query("SELECT * FROM url");
        return {
            data: rows,
        };
    } catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return error;
    }
}

export const actions = {
    create: async ({ request }) => {
        let mysqlconn = mysqlconnFn();
        try {
            const data = await request.formData();
            const url = data.get('url');
            const key = data.get('key');
            let [rows] = await mysqlconn.query(`SELECT * FROM url WHERE shorturl = ?`,[key]);
            if(rows.length == 0){
                await mysqlconn.query(`
                INSERT INTO url (longurl, shorturl)
                VALUES (?,?)
                `,[url,key])
                return { success: true };
            }
            else{
                return fail(400,{error:true ,message:"key is already exist",url,key});
            }
        } catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }
    },
    delete:async ({ request }) => {
        let mysqlconn = mysqlconnFn();
        try {
            const data = await request.formData();
            const id = data.get('id');
            await mysqlconn.query(`DELETE FROM url WHERE id = ?`,[id]);
            return { success: true };
        } catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }
    }
};