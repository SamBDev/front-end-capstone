'use strict';

abe.controller("MessageOptionsController", function($scope, $window, $routeParams, MessageFactory, UserFactory, CryptoService) {

    let messageId = $routeParams.messageId;
    let formattedMethodName = "";

    $scope.selectedMethod = {
        name: "RSA",
        key: 0
    };

    $scope.methods = {};

    let dynamicEncryptCalls = {
        RSA: CryptoService.encryptRSA,
        CaesarShift: CryptoService.encryptCaesarShift
    };

    let dynamicDecryptCalls = {
        RSA: CryptoService.decryptRSA,
        CaesarShift: CryptoService.decryptCaesarShift
    };

    $scope.saveResult = function(messageObj) {
        messageObj.text = messageObj.resultText;
        delete messageObj.resultText;
        MessageFactory.updateMessage(messageObj, messageObj.id)
            .then((response) => {
                console.log("response", response);
            });
    };

    $scope.callEncrypt = function(methodName, key) {
        formattedMethodName = methodName.replace(" ", "");
        if (methodName === "RSA") {
            MessageFactory.getKeypair(UserFactory.getUser())
                .then((keypair) => {
                    $scope.message.resultText = dynamicEncryptCalls[formattedMethodName]($scope.message.text, keypair)
                        .then((returned) => {
                            console.log("returned", returned);
                            $scope.message.resultText = returned;

                        });
                });
        } else {
            $scope.message.resultText = dynamicEncryptCalls[formattedMethodName]($scope.message.text, key);
        }
    };

    $scope.callDecrypt = function(methodName, key) {
        formattedMethodName = methodName.replace(" ", "");
        if (methodName === "RSA") {
            MessageFactory.getKeypair(UserFactory.getUser())
                .then((keypair) => {
                    $scope.message.resultText = dynamicDecryptCalls[formattedMethodName]($scope.message.text, keypair)
                        .then((returned) => {
                            console.log("returned", returned);
                            $scope.message.resultText = returned;
                        });
                });
        } else {
            $scope.message.resultText = dynamicDecryptCalls[formattedMethodName]($scope.message.text, key);
        }
    };

    MessageFactory.getMethods()
        .then((methodsData) => {
            $scope.methods = methodsData;
            // console.log("methodsData", $scope.methods);
        });

    MessageFactory.getSingleMessage(messageId)
        .then((messageData) => {
            // console.log("messageData", messageData);
            $scope.message = messageData;
        });



});