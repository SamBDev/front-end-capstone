"use strict";

$scope.caesarShift = function(inputString, key){
    let plainTextArr = inputString.split("");
    let cipherTextArr = [];
    let cipherText = "";
    let cipherCharCode = null;

    plainTextArr.forEach((char)=>{
        cipherCharCode = char.charCodeAt() + key;
        cipherTextArr.append(String.fromCharCode(cipherCharCode));
    });
    cipherText = cipherTextArr.join("");
    return cipherText;
};

$scope.vigenere = function(inputString, key){

};