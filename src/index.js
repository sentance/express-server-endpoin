const express = require('express');
require('./db/db');
const User = require('./models/user');
const Task = require('./models/tasks');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    
})
app.get('/users/:id', async (req, res)=>{
    const _id = req.params.id
    try {
        if(!user){
            return res.status(404).send()
        }
        const user = await User.findById(_id)
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    
})
app.get('/users', async (req, res)=>{
    try {
        const users = await User.findById({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
})
app.post('/task', async (req, res)=>{
    const task = new Task(req.body);
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

app.get('/tasks', async (req, res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }

})



app.get('/tasks/:id', async (req, res)=>{
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

})


app.patch('/user/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age', 'email']
    const isValidOperators = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperators){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user){
            return res.tatus(404).send()
        }
        res.send(user)
        User.findByIdAndUpdate()
    }catch(e){
        res.status(500).send(e)
    }
})
app.listen(port, ()=>{
    console.log('Server is running on port: ' + port);
})