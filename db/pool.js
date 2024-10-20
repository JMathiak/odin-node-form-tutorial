const { Pool } = require('pg');

module.exports = new Pool({
    host: 'localhost',
    user: "jmathiak",
    database: "top_users",
    password: "EverUpward44",
    port: 5432
});