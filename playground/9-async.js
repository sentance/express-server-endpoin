const add = (a, b) => {
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        }, 1000)
    })
}

const doWork =  async () => {
    const b = await add(5, 4);
    const c = await add(b, 2);
    const e = add(c, 2);
    return e
}

doWork().then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})