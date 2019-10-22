const {cipher,decipher} =  require( '../helpers/vinegereHelper');
exports.encryption = function (req, res) {
    let key = req.body.key;
    let pri = req.body.text;
    let flag = req.body.flag;
    if(flag==0){
        var result = cipher(key, pri);
    }else{
        var result = decipher(key, pri);
    }
    res.json(result);
}