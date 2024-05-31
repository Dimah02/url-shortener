// @ts-nocheck
import { mysqlconnFn } from "$lib/db/mysql";


export async function getAllUrls() {
    let mysqlconn = mysqlconnFn();
    try {
        const [rows] = await mysqlconn.query("SELECT * FROM url");
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function addUrl(url, key) {
    let mysqlconn = mysqlconnFn();
    try {
        let [rows] = await mysqlconn.query(`SELECT * FROM url WHERE shorturl = ?`, [key]);
        if (rows.length == 0) {
            await mysqlconn.query(`
                INSERT INTO url (longurl, shorturl)
                VALUES (?,?)
                `, [url, key])
            return "URL successfully added";
        }
        else {
            throw new Error("Key already exists");
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteUrl(id) {
    let mysqlconn = mysqlconnFn();
    try {
        await mysqlconn.query(`DELETE FROM url WHERE id = ?`, [id]);
        return "URL successfully deleted";
    } catch (error) {
        throw error;
    }
}

export async function getUrlByKey(key) {
    let mysqlconn = mysqlconnFn();
    try {
        const [rows] = await mysqlconn.query(
            `SELECT * FROM url WHERE shorturl = ?`,
            [key]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}

export async function updateUrlCount(id) {
    let mysqlconn = mysqlconnFn();
    try {
        await mysqlconn.query(`UPDATE url SET count = count + 1 WHERE id = ?`, [id]);
    } catch (error) {
        throw error;
    }
}