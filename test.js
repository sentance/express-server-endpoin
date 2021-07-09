const doWork = (calback)=>{
    setTimeout(() => {
        calback("Error printing messages", [2, 4, 5])
    }, 2000);
}

doWork((error, result)=>{
    if(error){
       return console.log(error)
    }
    console.log(result)
})