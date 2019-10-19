const User = require('../models/UserModel');

module.exports = {
    login: async (req, res, next) => {
        //Login a registered user
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send({ err: error })
        }

    },
    logout: async (req, res) => {
        // Log user out of the application
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    },
    logoutall: async (req, res) => {
        // Log user out of all devices
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    },
    view: async (req, res, next) => {//R
        res.send(req.body);
    },
    new: async (req, res, next) => {//C
        // Create a new user
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getAll: (req, res, next) => { //test
        let users = User.find().then(resuilt => {
            res.json(resuilt);
        }).catch(err => {
            res.status(404).send({ message: err });
        })

    },
    deleteAll: (req, res, next) => { //test
        let users = User.remove().then(resuilt => {
            res.status(200).json({ message: 'Đã clear document' });
        }).catch(err => {
            //throw err.status(400);
            res.status(400).send(err);
        })
    }
}