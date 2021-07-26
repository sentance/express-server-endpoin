const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }

    
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send('Unable to login')
    }
})
router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }

    
})


router.get('/user/me', auth, async (req, res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.send(e)
    }
    
})

router.post('/user/logout', auth, async(req, res)=>{
    try{
        req.user.tokens =  req.user.tokens.filter((token)=>{
            return token.token !== token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }
} )
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age', 'email']
    const isValidOperators = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperators){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/:id', async (req, res)=>{
    
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send(e)
        }
        res.send(user)

    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router