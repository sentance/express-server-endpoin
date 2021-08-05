const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const storage = multer.memoryStorage()
const sharp = require('sharp')
const {sendWelcomeMessage, sendDeleteAccountMessage} = require('../../emails/accounts')

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        sendWelcomeMessage(user.email, user.name)
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



router.get('/users/me', auth, async (req, res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.send(e)
    }
    
})

router.post('/users/logout', auth, async(req, res)=>{
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
router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age', 'email']
    const isValidOperators = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperators){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    }catch(e){
        res.status(500).send(e)
    }
})



router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendDeleteAccountMessage(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


const upload = multer({
    limits: {
         fileSize: 1000000
    },
    fileFilter(req, file, cb) {
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
              return cb(new Error('Please upload a jpg, jpeg, png images'))
         }
         cb(undefined, true)
    },
    storage
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize(300).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send()
 
}, (error, req, res, next) => {
    res.status(400).send({ error })
    next()

})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200)
})

router.get('/users/:id/avatar', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-type', 'image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})
module.exports = router