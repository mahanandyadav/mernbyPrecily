const express = require('express');
const User = require('../model/model');

const routes = express.Router();


routes.get('/api/count', async (req, res, next) => {
    console.log('call /api/count get method')
    res.send({
        "post": req.session.postClick,
        "patch": req.session.patchClick
    })
})

routes.post('/api/', async (req, res) => {

    console.log("call /api/ post method")

    const user = new User(req.body)

    try {
        await user.save()
        if (!req.session.postClick) {
            req.session.postClick = 0
            console.log('session postClick initialize')
        }
        req.session.postClick++
        res.send({ "user": user, "postClick": req.session.postClick });
    } catch (e) {
        res.send(e)
    }
})



routes.patch('/api/', async (req, res) => {
    const _id = req.query.id;
    console.log("call /api/ patch method")
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
            console.log('session patchClick initialize')

        }
        req.session.patchClick++
        res.send({ "user": user, 'patchClick': req.session.patchClick });
    } catch (e) {
        res.send(e)
    }
})
module.exports = routes;