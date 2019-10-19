function isalpha(str) {
    return (/^[a-zA-Z]+$/).test(str);
}

function getCol(i) {
    return i % 5;
}

function getRow(i) {
    return parseInt(i / 5);
}
function isLowerCase(code) {
    if (code >= 97 && code <= 122) {
        return true;
    }
    return false;
}
function removeDuplicate(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        if (result.indexOf(text.charAt(i)) == -1) {
            result += text.charAt(i);
        }
    }
    return result;
}
String.prototype.setCharAt = function (index, chr) {
    if (index < this.length) {
        return this.substr(0, index) + chr + this.substr(index + 1);
    }
    return this;
}
function getMatrixKey(key) {
    var alph = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    var temp = key.toUpperCase().replace(/[^A-Z_]+/g, "");
    temp = temp.replace('J', 'I');
    temp = removeDuplicate(temp + alph);
    return temp;

}
function process(message, matrixKey, isDecrypt = false) {
    var text = message.replace("J", "I");
    text = text.replace("j", "i");
    var result = "";
    var map = [];
    matrixKey = getMatrixKey(matrixKey);
    //console.log(matrixKey);
    var k = 1; //1 => encrypt, -1 => decrypt
    if (typeof matrixKey !== 'string' || typeof matrixKey !== 'string') {
        throw new Error('Playfair: key word and phrase must be strings');
    }

    // throw error if word is not valid
    if (!isalpha(matrixKey)) {
        throw new Error('Playfair: key word can only contain letters');
    }
    if (isDecrypt == true) {
        k = 4;
    }
    for (let i = 0; i < text.length; i++) {
        let codeTxt = text.charCodeAt(i);
        if ((codeTxt >= 65 && codeTxt <= 90) || (codeTxt >= 97 && codeTxt <= 122)) {
            map.push(i);
        }
    }
    if ((map.length % 2) == 1) {
        text += "X";
        map.push(text.length - 1);
    }

    for (let i = 0; i < map.length; i += 2) {
        let txtA = text.charAt(map[i]);
        let codeTxtA = txtA.charCodeAt();
        let txtB = text.charAt(map[i + 1]);
        let codeTxtB = txtB.charCodeAt();

        if (txtA == txtB) {
            txtB = "X";
        }

        let posA = matrixKey.indexOf(txtA.toUpperCase());
        let posB = matrixKey.indexOf(txtB.toUpperCase());
        let chrCphA = "";
        let chrChpB = "";

        if (getRow(posA) == getRow(posB)) {
            chrCphA = matrixKey.charAt((getRow(posA) * 5) + ((getCol(posA) + k) % 5));
            chrCphB = matrixKey.charAt((getRow(posB) * 5) + ((getCol(posB) + k) % 5));
        } else if (getCol(posA) == getCol(posB)) {
            chrCphA = matrixKey.charAt((((getRow(posA) + k) % 5) * 5) + (getCol(posA) % 5));
            chrCphB = matrixKey.charAt((((getRow(posB) + k) % 5) * 5) + (getCol(posB) % 5));
        } else {
            chrCphA = matrixKey.charAt((getRow(posA) * 5) + getCol(posB));
            chrCphB = matrixKey.charAt((getRow(posB) * 5) + getCol(posA));
        }

        if (isLowerCase(codeTxtA)) {
            chrCphA = chrCphA.toLowerCase();
        }
        if (isLowerCase(codeTxtB)) {
            chrCphB = chrCphB.toLowerCase();
        }
        text = text.setCharAt(map[i], chrCphA);
        text = text.setCharAt(map[i + 1], chrCphB);
    }
    return text;
}

module.exports = { process };