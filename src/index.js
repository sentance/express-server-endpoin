const express = require('express')
require('./db/db')

const app = express()
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb('File must be Word document')
        }
        cb(undefined, false)
        // cb(new Error('File must be PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})


app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({error})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const router = new express.Router()
app.use(router)



app.listen(port, ()=>{
    console.log('Server is running on port: ' + port)
})
