// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'u161819951_subham_food_ap',
  password: 'Admin@123',
  database: 'u161819951_subham_food_ap'
});

module.exports = connection