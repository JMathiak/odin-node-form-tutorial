const express = require('express')
const app = express()
const userRouters = require('./routes/usersRoutes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use("/", userRouters)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`))