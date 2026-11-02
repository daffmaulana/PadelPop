/**
 * Database migration script.
 * Reads padel_reservation.sql and executes it against the configured MySQL database.
 *
 * Usage:
 *   1. Set your DB connection details in .env (point to Aiven or any MySQL)
 *   2. Run: node scripts/migrate.js
 *
 * No MySQL client needed — uses the mysql2 package already in the project.
 */

require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,
  multipleStatements: true,
});

const sqlFile = path.join(__dirname, '..', 'padel_reservation.sql');

if (!fs.existsSync(sqlFile)) {
  console.error('❌ Cannot find padel_reservation.sql');
  process.exit(1);
}

const sql = fs.readFileSync(sqlFile, 'utf8');

connection.query(sql, (err) => {
  if (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Database schema & sample data imported successfully!');
  connection.end();
});
