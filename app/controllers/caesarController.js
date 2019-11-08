const {Caesar} = require('../helpers/caesarHelper');

exports.encryption = function(req,res){
    let key = req.body.key;
    let text = req.body.text;
    let flag = req.body.flag;
    var result = Caesar(text,key,flag);
    res.json(result);
}