const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Michel',
    email: 'igorya@mail.ru',
    password: '578sjykjHjs@&!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}
beforeEach( async ()=>{
   await User.deleteMany()
   await new User(userOne).save()

})

test('Should singup new user', async ()=>{
    const response = await request(app).post('/users').send({
        name: 'Oleh',
        email: 'sentance22@gmail.com',
        password: 'Privatiirw23@s'
    }).expect(201)
    //Aset that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    //Assertion about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Oleh',
            email: 'sentance22@gmail.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Privatiirw23@s')
})

test('Should login user', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    
    expect(response.body.token).toBe(user.tokens[1].token)


})

test('Should user can\'t login when not exist ', async ()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'notpass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should dont get profile', async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer ill')
        .send()
        .expect(401)
})

test('Should delete account for user', async()=>{
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
test('Should NOT delete account for non auth user', async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer skk`)
        .send()
        .expect(401)
})

test('Should upload avatar image', async ()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/defaultava.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user fields', async ()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Oleh'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Oleh')
})

test('Should Not update invalid user fields', async ()=>{
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Oleh'
        })
        .expect(401)
    const user = await User.findById(userOneId)
    expect(user.name).not.toEqual('Oleh')
})