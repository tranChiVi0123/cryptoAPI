const Post = require('../models/PostModel');
const User = require('../models/UserModel');

module.exports = {
    new: async (req, res, next) => {//C
        console.log(req.body);
        var post = new Post(req.body);
        await post.save().then(result => {
            res.status(201).send({ result: "OK" });
        }).catch(err => {
            console.log("Lỗi cmnr");
            console.log(err);
            res.status(400).send({ result: "Error" });
        })

    },
    view: (req, res, next) => {//R
        var posts = Post.find().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            console.log(err);
            res.status(400).send({ result: "Error" });
        })
    },
    update: async (req, res, next) => {//U
        let id = req.params.id;
        await Post.findByIdAndUpdate({ _id: id },
            {
                $set: req.body,
            },
            {
                new: true
            }).then(result => {
                res.send({ result: "OK" });
            }).catch(err => {
                console.log(err);
                res.send({ result: "Error" });
            });
    },
    delete: (req, res, next) => {//D
        let id = req.params.id;
        Post.findOneAndDelete({ _id: id }).exec().then(result => {
            if (result) {
                res.status(200).send(`Post book by id=${id}`);
            } else {
                res.status(404).send(`Can't find post by id=${id}`);
            };
        });
    },
    sovle: async (req, res, next) => {//U
        let iduser = req.params.id;
        let idpost = req.body.idpost;
        await Post.findOneAndUpdate({ _id: idpost }, { $addToSet: { solvedby: iduser } }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ result: "Error" });
            }
            return res.status(201).send({ result: "OK" });
        });
    },
    getRank: async (req, res, next) => {
        let ranks = [];
        let posts = await Post.find().then(
            result => {
                result.forEach(items => {
                    if (items != "") {
                        items.solvedby.forEach(item => {
                            ranks.push(item);
                        });
                    }
                });
            }
        ).catch(err => {
            console.log(err)
        });
        ranks.sort();
        res.send(ranks);
    }
}
