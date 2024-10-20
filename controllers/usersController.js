const usersStorage = require('../storages/usersStorage')

const { body, validationResult } = require("express-validator")

const alphaErr = "must only contain letters"
const lengthErr = "must be between 1 and 10 chartacters"
const emailErr = "must be an email!"
const ageNumErr = "must be a number"
const ageRangeErr = 'must be a number between 18 and 120'
const bioLengthErr = 'must be less than 200 characters'
exports.usersListGet = (req, res) => {
    res.render("index", {
        title: "User list",
        users: usersStorage.getUsers()  
    })
}



exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create User", 
    })
}

exports.usersCreatePost = (req, res) => {
    const {firstName, lastName, email, age, bio} = req.body;
    usersStorage.addUser({firstName, lastName, email, age, bio})
    res.redirect("/")
}

exports.usersUpdateGet = (req, res) =>{
    const user = usersStorage.getUser(req.params.id)
    res.render("updateUser", {
        title: "Update user",
        user: user
    })
}

exports.usersDeletePost = (req, res) =>{
    usersStorage.deleteUser(req.params.id)
    res.redirect("/")
}

exports.usersSearch = (req, res) => {

    const { queryType, searchString } = req.query;
    let users = usersStorage.getUsers()
    let results = []
    users.forEach((user) => {
        if(queryType == 'searchEmail')
        {
            if(user.email.includes(searchString)){
                results.push(user)
            }
        }else if(queryType == 'searchName')
        {
            let fullName = user.firstName + " " + user.lastName
            if(fullName.includes(searchString))
            {
                results.push(user)
            }
        }else if(queryType == 'searchBoth')
        {
            let fullName = user.firstName + " " + user.lastName
            if(fullName.includes(searchString) || user.email.include(searchString))
            {
                results.push(user)
            }
        }
    })
    console.log(results)
    res.render("searchResults", {
        title: "Search results",
        results: results
    })


}

const validateUser = [
    body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
    .isEmail().withMessage(`The email ${emailErr}`),
    body("age").trim()
    .isNumeric().withMessage(`${ageNumErr}`)
    .isFloat({ min: 18, max: 120}).withMessage(`The age ${ageRangeErr}`),
    body('body').trim()
    .isLength({min: 0, max: 200}).withMessage(`${bioLengthErr}`)
];

exports.usersCreatePost = [
    validateUser,
    (req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            })
        }
    
    const { firstName, lastName, email, age , bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/")
}
]

exports.usersUpdatePost = [
    validateUser,
    (req, res) =>{
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            })
        }
        const { firstName, lastName, email, age, bio} = req.body;
        usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio })
        res.redirect('/')
    }
]


