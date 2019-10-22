const User = require('../models/UserModel');
const Post = require('../models/PostModel');

const checkAuthor = async (req,res,next)=>{
    let id = req.params.id;
    let userID = req.body.userid;
    let userAuthor = await Post.findById({_id:id}).exec();
    //console.log(userAuthor);
    if(userID==userAuthor.submittedby){
        next();
    }else{
        res.send("You aren't author of this post.");
    }
}
module.exports = checkAuthor;