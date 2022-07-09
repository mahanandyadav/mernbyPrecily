const mongoose = require('mongoose')

//connecting to DB 
mongoose.connect(process.env.MONGO_DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log(`error in mongodb connection::: ${error}`)
    }else{
        console.log(`db connected`)
    }
})
