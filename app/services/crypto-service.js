"use strict";

abe.service('CryptoService', function() {

    this.encryptRSA = function(messageText, keypair){
        // return keypair.publicKey.
    };

    this.decryptRSA = function(messageText, keypair){
        console.log("deForge", forge);
    };

    this.encryptCaesarShift = function(messageText, key) {
        console.log("key", typeof(key));
        let inputTextArr = messageText.split("");
        let cipherTextArr = [];
        let cipherText = "";
        let cipherCharCode = 0;

        inputTextArr.forEach((char) => {
            if (char == " "){
                cipherTextArr.push(" ");
                return;
            }
            cipherCharCode = 0;
            cipherCharCode = char.charCodeAt() + (Number(key%26));
            if(cipherCharCode > 122){
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
            if (char == " "){
                cipherTextArr.push(" ");
                return;
            }
            cipherCharCode = 0;
            cipherCharCode = char.charCodeAt() - (Number(key%26));
            if(cipherCharCode < 97){
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