/**
    * Created by Tony on 01/10/2015.
    * For the project password-manager
    */
var crypto = require('crypto-js');

var secrectMessage = {
    name : 'Tony',
    secretName : '007'
};
var secretKey = '123key';

var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secrectMessage),secretKey);

console.log('message :' + encryptedMessage);

var bytes = crypto.AES.decrypt(encryptedMessage,secretKey);
var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log('decrypted : ' + decryptedMessage.secretName);