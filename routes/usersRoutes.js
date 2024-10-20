const { Router } = require('express')
const usersController = require('../controllers/usersController')
const userDBController = require('../controllers/userDBController')
const usersRouter = Router()

usersRouter.get("/", userDBController.getUsernames)
usersRouter.get("/create", userDBController.createUsernameGet)
usersRouter.post("/create", userDBController.createUserNamePost)
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost)
usersRouter.post("/:id/delete", usersController.usersDeletePost)
usersRouter.get("/search", usersController.usersSearch)
module.exports = usersRouter;