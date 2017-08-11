'use strict';

abe.controller("UserController", function($scope, $window, UserFactory) {

    $scope.account = {
        email: "",
        password: ""
    };

    $scope.register = () => {
        // let keyWorker;
        // if(typeof(keyWorker) === "undefined"){
        //     keyWorker = new Worker("./app/web-worker/keyGen.js");
        // }
        // // console.log("forge func", forge.rsa.generateKeyPair);
        // keyWorker.postMessage(null);
        // keyWorker.onmessage = function(event){
        //     console.log("event", event);
        //     keyWorker.terminate();
        //     keyWorker = undefined;
        // }
        // console.log("you clicked register");
        UserFactory.createUser($scope.account)
            .then((userData) => {
                // console.log("New User!", userData);
                if (userData) {
                    $scope.login();
                    $scope.account.password = null;

                    let userObj = {
                        uid: userData.uid
                    };

                    let keyObj = {
                        uid: userData.uid
                    };

                    // $scope.account.password = forge.md5.create($scope.account.password);
                    // $scope.account.password = $scope.account.password.digest();
                    forge.rsa.generateKeyPair({ bits: 2048, workers: 5 }, function(err, keypair) {
                        let pemPair = {};
                        let publicPem = forge.pki.publicKeyToPem(keypair.publicKey);
                        let privatePem = forge.pki.privateKeyToPem(keypair.privateKey);
                        pemPair.publicPem = publicPem;
                        pemPair.privatePem = privatePem;
                        keyObj.keypair = pemPair;
                        console.log("keyObj", keyObj);
                        // console.log("keypair", keypair);
                        // console.log("keyObj", keyObj);
                        // console.log("account", $scope.account);
                        let plainText = forge.util.encodeUtf8("another, longer test that i wish to try");
                        let cipherText = keypair.publicKey.encrypt(plainText);
                        let toHex = forge.util.bytesToHex(cipherText);
                        let toDecrypt = forge.util.hexToBytes(toHex);
                        console.log("toDecrypt", toDecrypt);
                        let plainText2 = keypair.privateKey.decrypt(toDecrypt);
                        // console.log("plainText", plainText);
                        // console.log("testString", cipherText);
                        // console.log("uhhh", toHex);
                        // console.log("plainText2", plainText2);
                        UserFactory.registerUser(userObj);
                        UserFactory.registerKeypair(keyObj);
                    });
                }
            });
    };

    $scope.login = () => {
        UserFactory.loginUser($scope.account)
            .then((userData) => {
                $window.location.href = '#!/messages/${userData.uid}';
            });
    };

    // Moved to nav ctrl
    // $scope.logout = () => {
    //   console.log("logout clicked");
    //   UserFactory.logoutUser();
    // };

});