//CRUD

const {MongoClient, ObjectId, Timestamp} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if (error){
       return console.log('Unable to connect')
    }
    
    const db = client.db(databaseName)

    db.collection('users').deleteOne({
        _id: new ObjectId('60daefdb1f08081e3c73ba74')
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Oleh',
    //     age: 28
    // }, (error, result)=>{
    //     if(error) {
    //         return console.log('unble to insert user')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([{
    //         name: "Kate",
    //         age: 27
    //     },
    //     {
    //         name: 'Mari',
    //         age: 3
    //     }
    // ], (error, result)=>{
    //     if(error){
    //        return console.log('Unable to insert')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([{
    //         description: "Mada easy to do apss with me",
    //         completed: true
    //     },
    //     {
    //         description: "Go to home and love your wallet",
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //        return console.log('Unable to insert')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').findOne({_id: new ObjectId('60dae55a302e3f4e0c486352')}, (error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age: 28}).toArray((error, users)=>{
    //     if(error){
    //         console.log('Unable to find')
    //     }
    //     console.log(users)
    // })
    // db.collection('users').find({age: 28}).count((error, count)=>{
    //     if(error){
    //         console.log('Unable to find')
    //     }
    //     console.log(count)
    // })
    //   db.collection('tasks').find({completed: true}).toArray((error, tasks)=>{
    //     if(error){
    //         console.log('Unable to find')
    //     }
    //     console.log(tasks)
    // })
})