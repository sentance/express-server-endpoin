const mongoose = require('mongoose');

mongoose.connect(process.env.DEV_MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});




