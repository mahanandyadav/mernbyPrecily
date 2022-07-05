const express = require('express');
const User = require('../model/model');

const routes = express.Router();

/*
routes.get('/', async (req, res, next) => {
    console.log('req.headers.cookie get')
    console.log(req.headers.cookie)
    // console.log(req.headers.cookie.split(';')[1].split('=')[1])
    res.send({
        "post": req.session.postClick,
        "patch": req.session.patchClick
    })
})*/

routes.post('/', async (req, res) => {

    console.log("req.headers.cookie post method")
    console.log(req.headers)

    // console.log(req.headers.cookie.split(';')[1])
    const user = new User(req.body)

    try {
        await user.save()
        if (!req.session.postClick) {
            req.session.postClick = 0
            console.log(req.session);
        }
        req.session.postClick++
        res.send({ "user": user, "postClick": req.session.postClick });
    } catch (e) {
        res.send(e)
    }
})

module.exports = routes;