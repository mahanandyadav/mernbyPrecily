const express = require('express');
require('dotenv').config()
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const mongoDBStore = require('connect-mongodb-session')(session)

const routes = require('./src/routes/routes')

require('./src/model/model');
require('./src/db/mongoose')

const app = express();
console.log(process.env.MNY)//testing veriable 

//connecting sessin to DB
const store = new mongoDBStore({
    uri: process.env.MONGO_DB_STRING,
    collection: "mySessions"
},(error)=>{
    if(error){
        console.log(`error in db connection index.js:: ${error}`)
    }else{
        console.log(`session connected to db @ index.js`)
    }
})

//express middelwares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", 'true')//true as string
    // res.header('Access-Control-Expose-Headers',
    // 'Date, Etag, Access-Control-Allow-Origin, Set-Cookie, Access-Control-Allow-Credentials')
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
        return res.status(200).send()
    }
    next();
})*/

//configuring session middelware
app.use(session({
    secret: "mny",
    saveUninitialized: true,
    cookie: {
        path: "/",//if / the cookies will be sent for all paths
        httpOnly: false,// if true, the cookie cannot be accessed from within the client-side javascript code.
        secure: false,// true->cookie has to be sent over HTTPS only
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: true,//- `none` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
        //for heroku sameStie:true/false works
    },
    store: store,
    resave: false,
}))


//addressing routes
app.use(routes);

//serving api build
if (process.env.ENVIRONMENT === 'production') {
    const loc = path.resolve(__dirname,'ui','build')
    app.use(express.static(loc))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(loc, 'index.html'))
    });
    console.log('running build from '+loc)
}

//listening to port
const port = process.env.PORT || 80;
app.listen((port), (error) => {
    console.log(`lisning on port ${port}`)
})