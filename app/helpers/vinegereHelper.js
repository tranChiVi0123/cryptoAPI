const lowerReference = 'abcdefghijklmnopqrstuvwxyz';
const upperReference = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @method isalpha
 * @param {String} str string to test
 * @return {Boolean} returns true if is a letter
 */
function isalpha(str) {
    return (/^[a-zA-Z]+$/).test(str);
}

/**
 * Applies Vigenère encryption to a phrase given a word and a
 * numeric flag passed as a the third argument, when flag is
 * positive it ciphers, when negative it deciphers
 * @method process
 * @param {String} word string to process
 * @param {String} phrase secret key
 * @param {Number} flag decides action
 * @return {String} result process output
 */
function process(word, phrase, flag = 1) {
    // check if arguments are correct
    if (typeof word !== 'string' || typeof phrase !== 'string') {
        throw new Error('vignere: key word and phrase must be strings');
    }

    // throw error if word is not valid
    if (!isalpha(word)) {
        throw new Error('vignere: key word can only contain letters');
    }

    // pass key word all to lower case
    word = word.toLowerCase();

    const len = phrase.length;
    const wlen = word.length;

    let i = 0,
        wi = 0,
        ci,
        pos,
        result = '';

    for (; i < len; i++) {
        pos = phrase[i];
        if (isalpha(pos)) {
            if (flag > 0) {
                ci = lowerReference.indexOf(pos.toLowerCase()) + lowerReference.indexOf(word[wi]);
            } else {
                ci = lowerReference.indexOf(pos.toLowerCase()) - lowerReference.indexOf(word[wi]);
                ci = ci < 0 ? 26 + ci : ci;
            }
            ci %= 26;
            // take cipher from lower or upper reference
            result = lowerReference.indexOf(pos) === -1 ? result + upperReference[ci] : result + lowerReference[ci];
            // reset word index when it exceeds word length
            wi = wi + 1 === wlen ? 0 : wi + 1;
        } else {
            result += pos;
        }
    }

    return result;
}

function cipher(w, p) {
    return process(w, p);
}

function decipher(w, p) {
    return process(w, p, -1);
}
module.exports = { cipher, decipher };