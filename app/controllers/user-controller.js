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
                    console.log("$scope.account", $scope.account);
                    // $scope.account.password = forge.md5.create($scope.account.password);
                    // $scope.account.password = $scope.account.password.digest();
                    forge.rsa.generateKeyPair({ bits: 2048, workers: 3 }, function(err, keypair) {
                        console.log("key accessible userData", userData);
                        // console.log("keypair", keypair);
                        $scope.account.keypair = keypair;
                        console.log("account", $scope.account);
                        let plainText = forge.util.encodeUtf8("another, longer test that i wish to try");
                        let cipherText = keypair.publicKey.encrypt(plainText);
                        let toHex = forge.util.bytesToHex(cipherText);
                        let plainText2 = keypair.privateKey.decrypt(cipherText);
                        console.log("plainText", plainText);
                        console.log("testString", cipherText);
                        console.log("uhhh", forge.util.bytesToHex(cipherText));
                        console.log("plainText2", plainText2);
                        UserFactory.registerUser($scope.account);
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