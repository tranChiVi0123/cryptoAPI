const {process}  =require('../helpers/playfairHelper');

exports.PlayfairControl = function(req,res){
     //console.log(req.body);
     let message = req.body.text;
     let key = req.body.key;
     let flag = req.body.flag;
     let isDecrypt = (flag==0);
     let result = process(message,key,isDecrypt);
     res.json(result);
}