
function Caesar(text, key, flag) {
    anpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    console.log(anpha.length);
    var result = "";
    if (flag == 0) {// mã hóa
        let arrTemp = [];
        for (var i = 0; i < text.length; i++) {
            let t = anpha.indexOf(text[i].toUpperCase());
            if (t > -1) {
                arrTemp[i] = (t + key) % 26;
            } else {
                arrTemp[i] = t;
            }
        }
        arrTemp.forEach(index => {
            if (index > -1) {
                result += anpha[index];
            } else {
                result += " ";
            }
        })
        // console.log(arrTemp);
        // console.log(result);
    } else {// mã hóa
        let arrTemp = [];
        for (var i = 0; i < text.length; i++) {
            let t = anpha.indexOf(text[i].toUpperCase());
            if (t > -1) {
                arrTemp[i] = (t + 26 - key) % 26;
            } else {
                arrTemp[i] = t;
            }
        }
        arrTemp.forEach(index => {
            if (index > -1) {
                result += anpha[index];
            } else {
                result += " ";
            }
        })
        // console.log(arrTemp);
        // console.log(result);
    }
    return result;
}

module.exports = {Caesar};