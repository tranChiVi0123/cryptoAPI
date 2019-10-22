const Post = require('../models/PostModel');

module.exports = {
    new: async (req, res, next) => {//C
        console.log(req.body);
        var post = new Post(req.body);
        await post.save().then(resuilt => {
            res.status(201).json(resuilt);
        }).catch(err => {
            res.status(400).send(err);
        })

    },
    view: (req, res, next) => {//R
        var posts = Post.find().then(resuilt => {
            res.status(201).json(resuilt);
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
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
            }).then(resuilt => {
                res.json(resuilt);
            }).catch(err => {
                res.json(err);
            });
    },
    delete: (req, res, next) => {//D
        let id = req.params.id;
        Post.findOneAndDelete({ _id: id }).exec().then(resuilt => {
            if (resuilt) {
                res.status(200).json(`Post book by id=${id}`);
            } else {
                res.status(404).json(`Can't find post by id=${id}`)
            };
        });
    },
    sovle: async (req, res, next) => {//U
        let iduser = req.params.id;
        let idpost = req.body.idpost;
        await Post.findOneAndUpdate({ _id: idpost }, { $addToSet: { solvedby: iduser } }, (err, doc) => {
            if (err) {
                return res.status(500).send("Failed");
            }
            return res.status(201).send("Successful!");
        });

    }
}
