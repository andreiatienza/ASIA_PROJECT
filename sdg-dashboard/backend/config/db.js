// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'asia_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection with detailed error logging
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database Connection Error Details:');
    console.error('Error Code:', err.code);
    console.error('Error Number:', err.errno);
    console.error('SQL State:', err.sqlState);
    console.error('Error Message:', err.message);
    console.error('Full Error:', err);
    return;
  }
  console.log('Successfully connected to database');
  connection.release();
});

module.exports = pool;
