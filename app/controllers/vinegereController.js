const {cipher,decipher} =  require( '../helpers/vinegereHelper');
exports.encryption = function (req, res) {
    let key = req.body.key;
    let pri = req.body.text;
    let flag = req.body.flag;
    if(flag==0){
        var resuilt = cipher(key, pri);
    }else{
        var resuilt = decipher(key, pri);
    }
    res.send({ message: resuilt });
}
exports.decryption = function (req, res) {

}