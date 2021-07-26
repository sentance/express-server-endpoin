const express = require('express')
require('./db/db')

const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     if(req.method === "GET"){
//         res.send('Get disabled')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next)=>{
//     if(req.method === "GET" || req.method === "POST"){
//         res.status(503).send('Server goes to maintence')
//     }
//     else{
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const router = new express.Router()
app.use(router)


const bcrypt = require('bcrypt')
// const myScript = async () =>{
//     const password = 'Red12345!'
//     const hashPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashPassword)
//     console.log(isMatch)
// }

// myScript()
const jwt = require('jsonwebtoken')

const myFunc = async ()=>{
    const token = await jwt.sign({_id: 'hasd99as9d'}, 'thisismynewcourse', {expiresIn: '7 days'})
    const isAuth = jwt.verify(token, 'thisismynewcourse')
    console.log(isAuth)

}

myFunc()
app.listen(port, ()=>{
    console.log('Server is running on port: ' + port)
})