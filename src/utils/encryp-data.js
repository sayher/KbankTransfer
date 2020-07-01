/* eslint-disable */
// var CryptoJS = require('crypto-js')
// import {CryptoJS} from 'crypto-js'
export default {
    encryptObject: function (data, scretKey) {
        var cipherText = this.CryptoJS.AES.encrypt(JSON.stringify(data), scretKey).toString();
        return cipherText;
    },
}
