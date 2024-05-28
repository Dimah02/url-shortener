// @ts-nocheck
import mysql from 'mysql2'
import { DB_USERNAME, DB_PASSWORD, HOST,DB_NAME } from '$env/static/private';
import dotenv from 'dotenv'
dotenv.config();

let mysqlconn = null;

export function mysqlconnFn(){
    if (mysqlconn === null) {
        mysqlconn = mysql.createPool({
            user: DB_USERNAME,
            password:DB_PASSWORD,
            host:HOST,
            database:DB_NAME
        }).promise()
    }
    return mysqlconn;
}