// @ts-nocheck
import mysql from 'mysql2'
import { USER, PASSWORD, HOST,DATABASE } from '$env/static/private';
import dotenv from 'dotenv'
dotenv.config();

let mysqlconn = null;

export function mysqlconnFn(){
    if (mysqlconn === null) {
        mysqlconn = mysql.createPool({
            user: USER,
            password:PASSWORD,
            host:HOST,
            database:DATABASE
        }).promise()
    }
    return mysqlconn;
}