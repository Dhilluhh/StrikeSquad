const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

async function initDB() {
    // Check if we are running with cloud credentials
    console.log('Connecting to database with the following config:');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`Database: ${process.env.DB_NAME}`);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306,
        multipleStatements: true
    });

    console.log('✅ Connected successfully to the server!');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '../server/database.sql');
    let sql = fs.readFileSync(sqlPath, 'utf8');

    // Cloud DBs usually give you a specific DB name (e.g. 'defaultdb').
    // Passing 'USE focus_quest' might fail if we don't have permission to create DBs.
    // We will assume the user has put the correct DB_NAME in their .env file.
    // We'll strip the "CREATE DATABASE" and "USE" lines to be safe for Cloud/Aiven defaultdb
    // or allow them if the user specifically set DB_NAME to 'focus_quest' and has perms.

    if (process.env.DB_NAME && process.env.DB_NAME !== 'focus_quest') {
        console.log(`ℹ️ NOTE: Configuring script to use provided DB_NAME: ${process.env.DB_NAME}`);
        // Remove CREATE DATABASE and USE if they exist, to rely on the connection's DB
        sql = sql.replace(/CREATE DATABASE IF NOT EXISTS focus_quest;/g, '-- [SKIPPED] CREATE DATABASE');
        sql = sql.replace(/USE focus_quest;/g, `-- [SKIPPED] USE focus_quest;`);

        // Switch to the correct DB
        await connection.query(`USE \`${process.env.DB_NAME}\``);
    }

    console.log('⏳ Running schema migration...');

    await connection.query(sql);

    console.log('✅ Schema migration completed successfully!');
    console.log('   Tables created: users, user_stats, character_configs, sessions');

    await connection.end();
}

initDB().catch(err => {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
});
