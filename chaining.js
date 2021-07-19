require('./src/db/db');
const User = require('./src/models/user');
const Tasks = require('./src/models/tasks');

//60e577e86f930b41a4f7a947

// User.findByIdAndUpdate('60e8099110c5954a18a8d6e8', {age: 1}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age: 1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTasks = async (id) =>{
    await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({completed: false})
    return count

}

deleteTasks('60e57837555ae34524c37735').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})