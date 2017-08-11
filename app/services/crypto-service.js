"use strict";

abe.service('CryptoService', function($q) {

    this.encryptRSA = function(messageText, userKeypair) {
        return $q((resolve, reject) => {

            // console.log("userKeypair", userKeypair);
            forge.rsa.generateKeyPair({ bits: 2048, workers: 5 }, function(err, generatedKeypair) {
                console.log("generatedKeypair", generatedKeypair);
                userKeypair.publicKey.encrypt = generatedKeypair.publicKey.encrypt;
                userKeypair.privateKey.decrypt = generatedKeypair.privateKey.decrypt;
                let plaintextToEncrypt = forge.util.encodeUtf8(messageText);
                let cipherTextBytes = userKeypair.publicKey.encrypt(plaintextToEncrypt);
                console.log("cipherTextBytes", cipherTextBytes);
                let cipherTextHex = forge.util.bytesToHex(cipherTextBytes);
                console.log("otherOtherCipherText", cipherTextHex);

                resolve(cipherTextHex);
            });
        });
    };

    this.decryptRSA = function(messageText, userKeypair) {
        return $q((resolve, reject) => {

            let decryptBytes;
            console.log("messageText", messageText);
            console.log("userKeypair", userKeypair);
            forge.rsa.generateKeyPair({ bits: 2048, workers: 5 }, function(err, generatedKeypair) {
                console.log("generatedKeypair", generatedKeypair);
                userKeypair.publicKey.encrypt = generatedKeypair.publicKey.encrypt;
                userKeypair.privateKey.decrypt = generatedKeypair.privateKey.decrypt;
                console.log("userKeypair", userKeypair);
                decryptBytes = forge.util.hexToBytes(messageText);
                // console.log("messageText", messageText);
                console.log("decryptBytes", decryptBytes);
                let decryptCipherText = userKeypair.privateKey.decrypt(decryptBytes);
                console.log("decryptCipherText", decryptCipherText);

                resolve(decryptCipherText);
            });
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