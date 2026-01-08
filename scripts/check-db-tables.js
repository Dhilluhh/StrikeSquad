const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

async function checkTables() {
    console.log('Connecting to database...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_NAME}`);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected!');

        const [rows] = await connection.execute('SHOW TABLES');
        console.log('Tables in database:');
        if (rows.length === 0) {
            console.log('  (No tables found)');
        } else {
            rows.forEach(row => {
                // The key name depends on the database name, usually "Tables_in_dbname"
                const tableName = Object.values(row)[0];
                console.log(`  - ${tableName}`);
            });
        }

        await connection.end();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    }
}

checkTables();
