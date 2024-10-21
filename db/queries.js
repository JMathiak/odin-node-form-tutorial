const pool = require('./pool')

async function getAllUserNames(){
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
    
}

async function getSearchResults(query){
    let adjQuery = '%' + query + '%'
    const { rows } = await pool.query("SELECT * FROM usernames WHERE username like $1", [adjQuery])
    return rows
}

async function deleteAllUsers(){
    await pool.query("DELETE FROM usernames")
}

module.exports = {
    getAllUserNames,
    insertUsername,
    getSearchResults,
    deleteAllUsers
}