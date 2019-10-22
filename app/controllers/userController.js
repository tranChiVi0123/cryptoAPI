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
                return res.status(401).send('Login failed! Check authentication credentials');
            }
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (error) {
            console.log(error);
            res.status(400).send("Lỗi đăng nhập!");
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
            await user.save();
            //const token = await user.generateAuthToken();
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    update: async (req, res, next) => {//U
        let id = req.params.id;
        let $set = req.body;
        $set.password = await bcrypt.hash($set.password,8);
        console.log($set);
        await User.findByIdAndUpdate({_id:id},{$set}).then(resuilt=>{
            //console.log(resuilt);
            res.status(201).send("Updated");
        }).catch(err=>{
            console.log(err);
            res.status(404).send("failed");
        })
    },
    getAll: (req, res, next) => { //test
        let users = User.find().then(resuilt => {
            res.json(resuilt);
        }).catch(err => {
            res.status(404).send({ message: err });
        })

    },
    removeOne: async (req, res, next) => {//D
        let id = req.params.id;
        let users = await User.findOneAndDelete({ _id: id }).exec().then(resuilt => {
            let post = Post.findOneAndDelete({ submittedby: id }).exec();
            res.status(201).send("Deleted");
        }).catch(err => {
            res.status(400).send("Failed");
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