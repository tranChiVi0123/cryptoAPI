const express = require('express');
const router = express.Router();
const Book = require('../app/models/BookModel')

router.get('/', (req, res) => {
    let book = Book.find().then(resuilt => {
        res.json(resuilt);
    }).catch(err => {
        res.status(404).json(err)
    });
})
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Book.findById({ _id: id }).then(resuilt => {
        res.json(resuilt);
    }).catch(err => {
        res.status(404).json(err);
    });
})
router.post('/', (req, res) => {
    const book = new Book({
        title: req.body.title,
        description: req.body.description
    });

    book.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});
router.put('/:id', (req, res) => {
    let id = req.params.id;
    Book.findOneAndUpdate({ _id: id },
        {
            $set: req.body
        },
        {
            new: true
        }).then(resuilt => {
            res.json(resuilt);
        }).catch(err => {
            res.json(err);
        });
});
router.delete('/:id', (req,res)=>{
    let id = req.params.id;
    Book.findOneAndDelete({_id:id}).exec().then(resuilt=>{
        if(resuilt){
            res.status(200).json(`Deleted book by id=${id}`);
        }else{
            res.status(404).json(`Can't find book by id=${id}`)
        };
    });
});

module.exports = router;