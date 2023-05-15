const mysql = require("mysql2");
require ("dotenv").config();

const dbConnect = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);


module.exports = dbConnect;
