const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'akaliabootcamp',
  port: 3306 // <--- XAMPP usa 3306, USBWebserver usa 3307
});
module.exports = pool;