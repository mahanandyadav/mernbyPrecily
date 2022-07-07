const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_DB_STRING, {
    mongoose.connect('mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/MernDocker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},(error)=>{
    console.log(`error in mongodb connection ${error}`)
})
