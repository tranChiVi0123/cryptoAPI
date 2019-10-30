const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res, next) => {
        //Login a registered user
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ result: 'Login failed! Check authentication credentials' });
            }
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            console.log(error);
            res.status(400).send({ result: "Login failed!" });
        }

    },
    logout: async (req, res) => {
        // Log user out of the application
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send({ result: "Goodbye!" })
        } catch (error) {
            console.log(error);
            res.status(500).send({result:"Error"})
        }
    },
    logoutall: async (req, res) => {
        // Log user out of all devices
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.send({ result: "You are logout all server. Next time! please login again." })
        } catch (error) {
            console.log(error);
            res.status(500).send({ result: "Error" });
        }
    },
    view: async (req, res, next) => {//R
        let id = req.params.id;
        User.findById({ _id: id }).then(result => {
            res.status(201).json(result);
        }).catch(err => {
            console.log(err);
            res.status(404).send({ result: "Not find!" })
        })
    },
    new: async (req, res, next) => {//C
        // Create a new user
        try {
            const user = new User(req.body)
            await user.save();
            //const token = await user.generateAuthToken();
            res.status(201).send({message:"OK"});
        } catch (error) {
            console.log(error);
            res.status(400).send({ result: "Error" });
        }
    },
    update: async (req, res, next) => {//U
        let id = req.params.id;
        let $set = req.body;
        $set.password = await bcrypt.hash($set.password, 8);
        console.log($set);
        await User.findByIdAndUpdate({ _id: id }, { $set }).then(result => {
            //console.log(result);
            res.status(201).send({ result: "OK" });
        }).catch(err => {
            console.log(err);
            console.log(err);
            res.status(404).send({ result: "Error" });
        });
    },
    getAll: (req, res, next) => { //test
        let users = User.find().then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
            res.status(404).send({ result: "Error" });
        })

    },
    removeOne: async (req, res, next) => {//D
        let id = req.params.id;
        let users = await User.findOneAndDelete({ _id: id }).exec().then(result => {
            let post = Post.findOneAndDelete({ submittedby: id }).exec();
            res.status(201).send({ result: "OK" });
        }).catch(err => {
            console.log(err);
            res.status(400).send({ result: "Error" });
        });
    },
    deleteAll: (req, res, next) => { //test
        let users = User.remove().then(result => {
            res.status(200).json({ result: 'Đã clear document' });
        }).catch(err => {
            //throw err.status(400);
            res.status(400).send(err);
        })
    }
}