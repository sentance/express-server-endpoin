const express = require('express')
require('./db/db')

const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const router = new express.Router()
app.use(router)


const bcrypt = require('bcrypt')
const myScript = async () =>{
    const password = 'Red12345!'
    const hashPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashPassword)
    console.log(isMatch)
}

// myScript()

app.listen(port, ()=>{
    console.log('Server is running on port: ' + port);
})