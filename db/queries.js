const pool = require('./pool')

async function getAllUserNames(){
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
    
}

module.exports = {
    getAllUserNames,
    insertUsername
}