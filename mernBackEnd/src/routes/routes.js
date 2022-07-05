const express = require('express');
const User = require('../model/model');

const routes = express.Router();

routes.get('/', async (req, res, next) => {
    console.log(req.headers)
    console.log('req.headers.cookie')
    // console.log(req.headers.cookie.split(';')[1].split('=')[1])
    res.send({
        "post": req.session.postClick,
        "patch": req.session.patchClick
    })
})

var addCount = 0;
var updateCount = 0;
routes.post('/', async (req, res) => {

    console.log("post method")
    console.log(req.headers.cookie)

    // console.log(req.headers.cookie.split(';')[1])
    console.log(req.cookies)
    const user = new User(req.body)

    try {
        await user.save()
        if (!req.session.postClick) {
            req.session.postClick = 0
            console.log('if runs')
            console.log(req.session);
        }
        req.session.postClick++
        res.send({ "user": user, "postClick": req.session.postClick });
    } catch (e) {
        res.send(e)
    }
})

routes.patch('/', async (req, res) => {
    const _id = req.query.id;
    console.log("post patch")
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']
    const isValidUpdateOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidUpdateOperation) {
        return res.status(405).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findOne({ _id })
        if (!user) {
            return res.status(404).send('user not found with id')
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();

        if (!req.session.patchClick) {
            req.session.patchClick = 0
            console.log('if runs')
            console.log(req.session);
        }
        req.session.patchClick++
        res.send({ "user": user, 'patchClick': req.session.patchClick });
    } catch (e) {
        res.send(e)
    }
})
module.exports = routes;