const db = require("../db/queries")

// async function getUsernames(req, res){
//     const usernames = await db.getAllUserNames()
//     console.log("Usernames: ", usernames)
//     res.send("Usernames: " + usernames.map(user => user.username).join(", "))
// }

async function getUsernames(req, res){
    const usernames = await db.getAllUserNames()
    res.render("index", {
        title: "User list",
        users: usernames
    })
}

async function createUsernameGet(req, res)
{
    res.render("createUser", {
        title: "Create User"
    })
}


async function createUserNamePost(req, res)
{
    const { username } = req.body
    await db.insertUsername(username)
    res.redirect("/")
}

async function getSearchResults(req, res) {
    const { searchString } = req.query
    const usernames = await db.getSearchResults(searchString)
    res.render("searchResults", {
        title: "Search results",
        users: usernames
    })
    
}

async function deleteUsernames(req, res){
    await db.deleteAllUsers()
    res.redirect("/")
}

module.exports = {
    getUsernames,
    createUserNamePost,
    createUsernameGet,
    getSearchResults,
    deleteUsernames
}