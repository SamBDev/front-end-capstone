"use strict";

abe.service('CryptoService', function($q) {

    this.encryptRSA = function(messageText, userKeypair) {
        return $q((resolve, reject) => {

            let userPublicKey = forge.pki.publicKeyFromPem(userKeypair.publicPem);
            let cipherTextBytes = userPublicKey.encrypt(messageText);
            let cipherTextHex = forge.util.bytesToHex(cipherTextBytes);

            // userKeypair.publicKey.encrypt = generatedKeypair.publicKey.encrypt;
            // userKeypair.privateKey.decrypt = generatedKeypair.privateKey.decrypt;
            // let plaintextToEncrypt = forge.util.encodeUtf8(messageText);
            // let cipherTextBytes = userKeypair.publicKey.encrypt(plaintextToEncrypt);
            // console.log("cipherTextBytes", cipherTextBytes);
            // console.log("otherOtherCipherText", cipherTextHex);

            resolve(cipherTextHex);
        });
    };

    this.decryptRSA = function(messageText, userKeypair) {
        return $q((resolve, reject) => {

            let userPrivateKey = forge.pki.privateKeyFromPem(userKeypair.privatePem);
            let cipherTextBytes = forge.util.hexToBytes(messageText);
            let plainText = userPrivateKey.decrypt(cipherTextBytes);

            // userKeypair.publicKey.encrypt = generatedKeypair.publicKey.encrypt;
            // userKeypair.privateKey.decrypt = generatedKeypair.privateKey.decrypt;
            // let plaintextToEncrypt = forge.util.encodeUtf8(messageText);
            // let cipherTextBytes = userKeypair.publicKey.encrypt(plaintextToEncrypt);
            // console.log("cipherTextBytes", cipherTextBytes);
            // console.log("otherOtherCipherText", cipherTextHex);

            resolve(plainText);
        });
    };

    this.encryptCaesarShift = function(messageText, key) {
        console.log("key", typeof(key));
        let inputTextArr = messageText.split("");
        let cipherTextArr = [];
        let cipherText = "";
        let cipherCharCode = 0;

        inputTextArr.forEach((char) => {
            if (char == " ") {
                cipherTextArr.push(" ");
                return;
            }
            cipherCharCode = 0;
            cipherCharCode = char.charCodeAt() + (Number(key % 26));
            if (cipherCharCode > 122) {
                cipherCharCode -= 26;
            }
            console.log("cipherCharCode", cipherCharCode);
            cipherTextArr.push(String.fromCharCode(cipherCharCode));
        });
        cipherText = cipherTextArr.join("");
        console.log("cipherText", cipherText);
        return cipherText;
    };

    this.decryptCaesarShift = function(messageText, key) {
        console.log("key", typeof(key));
        let inputTextArr = messageText.split("");
        let cipherTextArr = [];
        let cipherText = "";
        let cipherCharCode = 0;

        inputTextArr.forEach((char) => {
            if (char == " ") {
                cipherTextArr.push(" ");
                return;
            }
            cipherCharCode = 0;
            cipherCharCode = char.charCodeAt() - (Number(key % 26));
            if (cipherCharCode < 97) {
                cipherCharCode += 26;
            }
            console.log("cipherCharCode", cipherCharCode);
            cipherTextArr.push(String.fromCharCode(cipherCharCode));
        });
        cipherText = cipherTextArr.join("");
        console.log("cipherText", cipherText);
        return cipherText;
    };

});


// $scope.vigenere = function(inputString, key){

// };