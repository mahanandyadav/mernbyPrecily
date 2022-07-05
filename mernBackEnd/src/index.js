const express = require('express');
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const mongoDBStore = require('connect-mongodb-session')(session)

const routes = require('./routes/routes')

require('./model/model');
require('./db/mongoose')

const app = express();

const store = new mongoDBStore({
    uri: 'mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/MernDocker?retryWrites=true&w=majority',
    collection: "mySessions"
})

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



app.use(routes);
if (process.env.NODE_ENV === 'production' || true) {
    const loc = path.resolve(__dirname, '..', '..', 'mernFrontEnd', 'dist')
    app.use(express.static(loc))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(loc, 'index.html'))
    });
    console.log('runnig build')
}
const port = process.env.PORT || 3001;
app.listen((port), (error) => {
    console.log(`lisning on port ${port}`)
})