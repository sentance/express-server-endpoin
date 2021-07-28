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



app.listen(port, ()=>{
    console.log('Server is running on port: ' + port)
})

const User = require('./models/user')
const Task = require('./models/tasks')

const main = async () => {
    const user = await User.findById('610117f1f637563450440813')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()